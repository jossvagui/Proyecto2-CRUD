//Evento para crear un nuevo cliente
document.getElementById("formulario").addEventListener("submit",crear);

//funcion crear cliente
function crear(e){
    titulo = document.getElementById("titulo").value
    email = document.getElementById("email").value
    telefono = document.getElementById("telefono").value

    let libro = {
        titulo,
        email,
        telefono
    }

    if (localStorage.getItem("Libros") === null){
        let libros = []
        libros.push(libro)
        localStorage.setItem("Libros",JSON.stringify(libros))        
    } else {
        let libros = JSON.parse(localStorage.getItem("Libros"))
        libros.push(libro)
        localStorage.setItem("Libros",JSON.stringify(libros))
    }
    leer();
    document.getElementById("formulario").reset();
    e.preventDefault();
    console.log("Cliente guardado correctamente")
}

//funcion leer cliente
function leer(){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    document.getElementById("tbody").innerHTML = "";
    for(let i=0; i < libros.length; i++){
        let titulo = libros[i].titulo
        let email = libros[i].email
        let telefono = libros[i].telefono

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${titulo}</td>
            <td>${email}</td>
            <td>${telefono}</td>
            <td><button onclick="eliminar('${titulo}')" class="btn btn-danger">Eliminar</button></td>
            <td><button onclick="editar('${titulo}')" class="btn btn-success">Editar</button></td>
        </tr>`
    }
}

//funcion editar
function editar(titulo){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    for(let i=0; i<libros.length; i++){
        if(libros[i].titulo === titulo){
            document.getElementById("body").innerHTML = `
            <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header">
                            <h2>Editar cliente</h2>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group mb-3">
                                    <input type="text" id="newtitulo" class="form-control" placeholder="${libros[i].titulo}">
                                </div>
                                <div class="form-group mb-3">
                                    <input type="email" id="newemail" class="form-control" placeholder="${libros[i].email}">
                                </div>
                                <div class="form-group mb-3">
                                    <input type="number" id="newtelefono" class="form-control" placeholder="${libros[i].telefono}">
                                </div>                                
                            </form>
                            <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
                            <button class="btn btn-primary" onclick="vistaPrincipal()">Cancelar</button>
                        </div>
                    </div>`
        }
    }
}

//funcion actualizar
function actualizar(i){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    libros[i].titulo = document.getElementById("newtitulo").value;
    libros[i].email = document.getElementById("newemail").value;
    libros[i].telefono = document.getElementById("newtelefono").value;
    if(libros[i].titulo == ""){
        alert("No ha ingresado el nombre")
    }else{
        if(libros[i].email == ""){
            alert("No ha ingresado el email")
        }else{
            if(libros[i].telefono == ""){
                alert("No ha ingresado el telefono")
            }else{
                localStorage.setItem("Libros",JSON.stringify(libros));
                vistaPrincipal();
            }
            
        }
        
    }
    
}

//funcion eliminar
function eliminar(titulo){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    for(let i=0; i<libros.length; i++){
        if(libros[i].titulo === titulo){
            libros.splice(i,1);
        }
    }

    localStorage.setItem("Libros",JSON.stringify(libros));
    leer();
}

//funcion para mostrar pantalla principal
function vistaPrincipal(){
    document.getElementById("body").innerHTML = `
    <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header">
                            <h2>Agregar nuevo cliente</h2>
                        </div>
                        <div class="card-body">
                            <form id="formulario">
                                <div class="form-group mb-3">
                                    <input type="text" id="titulo" class="form-control" placeholder="Ingresar nombre">
                                </div>
                                <div class="form-group mb-3">
                                    <input type="email" id="email" class="form-control" placeholder="Ingresar email">
                                </div>
                                <div class="form-group mb-3">
                                    <input type="number" id="telefono" class="form-control" placeholder="Ingresar telefono">
                                </div>

                                <button type="submit" class="btn btn-primary">Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <table class="table">
                        <thead class="table-light">
                          <tr>                              
                              <th scope="col">Nombre</th>
                              <th scope="col">Email</th>
                              <th scope="col">Teléfono</th>
                          </tr>
                        </thead>
                        <tbody id="tbody">                                               
                        </tbody>
                      </table>
                </div>
            </div>`
            leer();
}

leer();