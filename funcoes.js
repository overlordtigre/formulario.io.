$(function() {

    var operacao = "A"; //"A"=Adição; "E"=Edição

    var indice_selecionado = -1;

    var tbClientes = localStorage.getItem("tbClientes"); // Recupera os dados armazenados

    tbClientes = JSON.parse(tbClientes); // Converte string para objeto

    if (tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];

    function Adicionar() {
        var cli = GetCliente("assistente", $("#assistente").val());

        if (cli != null) {
            alert("Código já cadastrado.");
            return;
        }

        var cliente = JSON.stringify({
            Assistente: $("#assistente").val(),
            FAA: $("#FAA").val(),
            Nascimento: $("#dia").val(),
            Nome: $("#nome").val(),
            Sexo: $("#sexo").val(),
            CID: $("#CID").val()
        });

        tbClientes.push(cliente);

        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

        alert("Registro adicionado.");
        return true;
    }

    function Editar() {
        tbClientes[indice_selecionado] = JSON.stringify({
            Assistente: $("#assistente").val(),
            FAA: $("#FAA").val(),
            Nascimento: $("#dia").val(),
            Nome: $("#nome").val(),
            Sexo: $("#sexo").val(),
            CID: $("#CID").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Informações editadas.")
        operacao = "A";
        return true;
    }

    function Listar() {
        $("#tblListar").html("");
        $("#tblListar").html(
            "<thead>" +
            "	<tr>" +
            "<th></th>" +
            "	<th>assistente</th>" +
            "	<th>FAA</th>" +
            "	<th>nome</th>" +
            "	<th>nascimento</th>" +
            "    <th>sexo</th>" +
            "	<th>CID</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );

        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            $("#tblListar tbody").append("<tr>" +
                "	<td><img src='edit.png' alt='" + i + "' class='btnEditar'/><img src='delete.png' alt='" + i + "' class='btnExcluir'/></td>" +
                "	<td>" + cli.Assistente + "</td>" +
                "	<td>" + cli.FAA + "</td>" +
                "	<td>" + cli.Nome + "</td>" +
                "	<td>" + cli.Nascimento + "</td>" +
                "	<td>" + cli.Sexo + "</td>" +
                "	<td>" + cli.CID + "</td>" +
                "</tr>");
        }
    }

    function Excluir() {
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro excluído.");
    }

    function GetCliente(propriedade, valor) {
        var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
    }

    Listar();

    $("#frmCadastro").on("submit", function() {
        if (operacao == "A")
            return Adicionar();
        else
            return Editar();
    });

    $("#tblListar").on("click", ".btnEditar", function() {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#assistente").val(cli.Assistente);
        $("#nome").val(cli.Nome);
        $("#FAA").val(cli.FAA);
        $("#nascimento").val(cli.Nascimento);
        $("sexo").val(cli.Sexo);
        $("CID").val(cli.CID);
        $("#FAA").attr("readonly", "readonly");
        $("#Nome").focus();
    });

    $("#tblListar").on("click", ".btnExcluir", function() {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });
});