module.exports = function(app){
	var paciente = app.models.paciente;
	var vacina = app.models.vacinas;
	var vacinas;
	
	var pacienteController = {
		
		index:function(req, res){
			res.render('Paciente/index');

		},
		cadastro:function(req,res){
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

			vacina.find(function(err,dados){
				if(err){
					//
				}else{
					vacinas=dados;
				}

			});

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
		cartao:function(req,res){

		}
	}
	return pacienteController;
}