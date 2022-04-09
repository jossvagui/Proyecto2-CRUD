//Evento para crear un nuevo cliente
document.getElementById("formulario").addEventListener("submit",crear);

//funcion crear cliente
function crear(e){
    titulo = document.getElementById("titulo").value
    descripcion = document.getElementById("descripcion").value
    precio = document.getElementById("precio").value

    let libro = {
        titulo,
        descripcion,
        precio
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
    console.log("Libro guardado correctamente")
}

//funcion leer cliente
function leer(){
    let libros = JSON.parse(localStorage.getItem("Libros"));
    document.getElementById("tbody").innerHTML = "";
    for(let i=0; i < libros.length; i++){
        let titulo = libros[i].titulo
        let descripcion = libros[i].descripcion
        let precio = libros[i].precio

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${titulo}</td>
            <td>${descripcion}</td>
            <td>${precio}</td>
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
                                <div class="form-group">
                                    <input type="text" id="newtitulo" class="form-control" placeholder="${libros[i].titulo}">
                                </div>
                                <div class="form-group">
                                    <textarea id="newdescripcion" class="form-control" placeholder="${libros[i].descripcion}"></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="number" id="newprecio" class="form-control" placeholder="${libros[i].precio}">
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
    libros[i].descripcion = document.getElementById("newdescripcion").value;
    libros[i].precio = document.getElementById("newprecio").value;
    if(libros[i].titulo == ""){
        alert("No ha ingresado el nombre")
    }else{
        if(libros[i].descripcion == ""){
            alert("No ha ingresado la descripción")
        }else{
            if(libros[i].precio == ""){
                alert("No ha ingresado el precio")
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
                                <div class="form-group">
                                    <input type="text" id="titulo" class="form-control" placeholder="Ingresar nombre">
                                </div>
                                <div class="form-group">
                                    <textarea id="descripcion" class="form-control" placeholder="Ingresar servicios contratados"></textarea>
                                </div>
                                <div class="form-group">
                                    <input type="number" id="precio" class="form-control" placeholder="Ingresar precio">
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
                              <th scope="col">Descripción</th>
                              <th scope="col">Precio</th>
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