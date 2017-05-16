module.exports = function(app){
	var paciente = app.models.paciente;
	var vacina = app.models.vacinas;
	
	var pacienteController = {
		
		index:function(req, res){
			res.render('Paciente/index');

		},
		create:function(req,res){
			res.render('Paciente/create');
		},
		cadastro:function(req,res){
			var vacinas;
			vacina.find(function(err,dados){
				if(err){
					//
				}else{
					vacinas=dados;
				}

			});
			var model = new paciente();
			model.nome = req.body.nome;
			model.nasc = req.body.nasc;
			model.rg  = req.body.rg;
			model.cpf = req.body.cpf;
			model.email = req.body.email;
			model.sexo = req.body.sexo;
			model.pais.pai = req.body.pai;
			model.pais.mae = req.body.mae;
			model.endereco.rua =req.body.rua;
			model.endereco.numero = req.body.numero;
			model.endereco.bairro = req.body.bairro;
			model.endereco.cep = req.body.cep;
			model.endereco.cidade = req.body.cidade;
			model.endereco.uf = req.body.uf;
			model.telefone = req.body.telefone;

			

			paciente.findOne({'cpf' : model.cpf}, function(err, data){
					if(data){
						req.flash('erro', 'CPF já cadastrado');
						res.render('Paciente/index', {paciente: model});
					}else{
						model.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar paciente: ' + err);
								res.render('Paciente/index', {paciente: req.body});
							}else{
								req.flash('info', 'Paciente cadastrado com sucesso!');

								res.render('Paciente/cartao', {vacinas:vacinas,paciente:model});
							}
						});
					}
				});
		},
		buscar:function(req,res){
			paciente.findOne({cpf: req.body.cpf}, function(err, data){
				if(err){
					res.send('paciente não encontrado');
				}else{
					res.send(data);
				}
			});

		},
		imprimiCartao:function(req,res){
			paciente.findOne({cpf:req.body.cpf})
				.populate({path:'vacinas', model: 'vacinas'})
				.exec(function(err, dados){
					if(err){
						res.send('erro ao popular paciente');
					}else if(dados){
						res.render('Paciente/cartao', {paciente:dados});
					}
				});
		},
		update: function(req, res){
			
		},
		aplicarView: function(req, res){
			vacina.find()
				.exec(function(err, dados){
					if(!dados){
						res.render('Paciente/aplicarVacina', {vacina: '', paciente: ' '});
					}else if(dados){
						res.render('Paciente/aplicarVacina', {vacinas: dados, paciente: ' '});
					}
				});
			
		},
		aplicar: function(req, res){
			vacina.findOne({_id: req.body.vacinas}, function(err, data){
				if(err){
					res.send('vacina não encontrada');
					console.log("entrou aqui");
				}else{
					paciente.findById({_id: req.body.id}, function(err, paciente){
					console.log('ID: '+ paciente.nome);


					paciente.vacinas.push({data: req.body.date, vacina: data._id});

					paciente.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao atualizar os dados: ' + err);
							res.render('Paciente/cartao', {paciente: paciente});
						}
						else{
								console.log("entrou aqui");
								req.flash('info', 'Registro atualizado com sucesso!');
								res.redirect('/aplicarVacina');
							}
						
					});
				});
					
				}
			});
			
		}
	}
	return pacienteController;
}