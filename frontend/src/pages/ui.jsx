import { useLocation, Link, useParams } from "react-router-dom";
import CajaUser, { CajaIndumentaria } from "../components/caja";
import '../styles/ui.css';
import '../styles/navbar.css'
import axios from "axios";
import { useState } from "react";
import Box from "../components/Box";
import user from '../images/main/user.jfif'
import edit from '../images/zapatillas/edit.png'



export default function UserInterface() {

    let { id } = useParams(); //id del usuario que ingresó

    const [producto, setProducto] = useState('')


    const [listaZapas, setListaZapas] = useState([]); //creo array para guardar las zapatillas que reciba
    const [listaIndumentaria, setListaIndumentaria] = useState([]); //creo array para guardar la ropa que reciba
    const [listaPromos, setListaPromos] = useState([]); //creo array para guardar las promos que reciba


    const location = useLocation();
    const { datos } = location.state; //recibo los datos enviados de la variable state.

    const userDatos = JSON.parse(datos); //creo una variable que contenga los datos y los convierto en json, ya puedo acceder a los datos desde la variable creada.

    const obtenerZapatillas = () => {
        setProducto('zapatillas');
        axios.get('http://localhost:3001/zapa') //hago solicitud get al back para obtener las zapatillas
            .then(result => { setListaZapas((result.data)) }) //guardo los resultados del back en setLista
            .catch(e => { console.log(e) }) //en caso de error imprimo en consola
    }

    const obtenerIndumentaria = () => {
        setProducto('indumentaria');
        axios.get('http://localhost:3001/indumentaria') //hago solicitud get al back para obtener las ropas
            .then(result => { setListaIndumentaria((result.data)) }) //guardo los resultados del back en setListaIndumentaria
            .catch(e => { console.log(e) }) //en caso de error imprimo en consola
    }

    const obtenerPromos = () => {
        setProducto('promos');
        axios.get('http://localhost:3001/promos') //hago solicitud get al back para obtener las ropas
            .then(result => { setListaPromos((result.data)) }) //guardo los resultados del back en setListaIndumentaria
            .catch(e => { console.log(e) }) //en caso de error imprimo en consola
    }

    const verDatos = () => {
        setProducto('mis datos');
    }

    const volver = () => {
        setProducto('');
    }

    const token = localStorage.getItem('token')

    const actualizarNombre = () => { //ACTUALIZAR NOMBRE

        const nuevoNombre = prompt('ingresa tu nuevo nombre'); //variable que guarda el nuevo dato
        if (nuevoNombre === null) {
            alert('cancelaste la operacion')
            return;
        }
        if (nuevoNombre === "") {
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/nombre', {
            id,
            nuevoNombre
        }, {
            headers: {
                Authorization: token
            }
        })
            .then((result) => {
                alert(result.data.msj)
            })
            .catch((e) => { console.log(e) });
    }

    const actualizarApellido = () => { //ACTUALIZAR APELLIDO
        const nuevoApellido = prompt('ingresa tu nuevo apellido'); //variable que guarda el nuevo dato
        if (nuevoApellido == null) {
            alert('cancelaste la operacion')
            return;
        }
        if (nuevoApellido === "") {
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/apellido', {
            id,
            nuevoApellido
        }, {
            headers: {
                Authorization: token
            }
        })
            .then((result) => {
                alert(result.data.msj)
            })
            .catch((e) => { console.log(e) });
    }

    const actualizarEmail = () => { //ACTUALIZAR EMAIL
        const nuevoEmail = prompt('ingresa tu nuevo email'); //variable que guarda el nuevo dato
        if (nuevoEmail == null) {
            alert('cancelaste la operacion')
            return;
        }
        if (nuevoEmail === "") {
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/email', {
            id,
            nuevoEmail
        }, {
            headers: {
                Authorization: token
            }
        })
            .then((result) => {
                alert(result.data.msj)
            })
            .catch((e) => { console.log(e) });
    }

    const actualizarUsername = () => { //ACTUALIZAR USERNAME
        const nuevoUsername = prompt('ingresa tu nuevo Username'); //variable que guarda el nuevo dato
        if (nuevoUsername == null) {
            alert('cancelaste la operacion')
            return;
        }
        if (nuevoUsername === "") {
            alert("Ingresa un valor válido");
            return;
        }
        axios.put('http://localhost:3001/actualizarDato/username', {
            id,
            nuevoUsername
        }, {
            headers: {
                Authorization: token
            }
        })
            .then((result) => {
                alert(result.data.msj)
            })
            .catch((e) => { console.log(e) });
    }

    const eliminarCuenta = () => {
        axios.delete(`http://localhost:3001/eliminarCuenta/${id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(e => {
                alert(e.data.msj) // Elemento eliminado
                localStorage.removeItem('token');
                window.location.replace('/'); //redirecciona al main
            })
            .catch(error => {
                console.error(error)
            });

    }

    //funcion de cerrar sesion
    const cerrarSesion = () => {
        localStorage.removeItem('token'); //remover el token de localStorage
        window.location.replace('/'); //dirigirlo a la pagina main
    }

    return (
        <div className="all">
            <div className="main-barra">
                <h1><Link to={'/'} className='link'>FitClothes</Link></h1>
                <div className='main-barra-links'>
                    <p className="link" onClick={verDatos}>ver perfil</p>
                    <p onClick={cerrarSesion} className="link">cerrar sesion</p>
                </div>
            </div>

            <div className="subnav-ui">
                <ul>
                    <li>Men</li>
                    <li>Women</li>
                    <li>Kids</li>
                </ul>
            </div>
            {producto === '' && (
                <div className="menu-lateral">
                    <aside>
                        <p >Género</p>
                        <ul>
                            <li><input type="checkbox" /> <b>hombre</b></li>
                            <li><input type="checkbox" /> <b>mujer</b></li>
                            <li><input type="checkbox" /> <b>niño</b></li>
                        </ul><br /><hr /><br />
                        <p >Marca</p>
                        <ul>
                            <li><input type="checkbox" /> <b>Nike</b></li>
                            <li><input type="checkbox" /> <b>Adidas</b></li>
                            <li><input type="checkbox" /> <b>Puma</b></li>
                        </ul><br /><hr /><br />
                        <p >Talle</p><br />
                        <div className="box-talles">
                            <ul>
                                <li><input type="checkbox" /> <b>29</b></li>
                                <li><input type="checkbox" /> <b>31</b></li>
                                <li><input type="checkbox" /> <b>33</b></li>
                                <li><input type="checkbox" /> <b>35</b></li>
                                <li><input type="checkbox" /> <b>37</b></li>
                                <li><input type="checkbox" /> <b>39</b></li>
                                <li><input type="checkbox" /> <b>41</b></li>
                                <li><input type="checkbox" /> <b>43</b></li>
                                <li><input type="checkbox" /> <b>45</b></li>
                                <li><input type="checkbox" /> <b>47</b></li>
                            </ul>
                            <ul>
                                <li><input type="checkbox" /> <b>30</b></li>
                                <li><input type="checkbox" /> <b>32</b></li>
                                <li><input type="checkbox" /> <b>34</b></li>
                                <li><input type="checkbox" /> <b>36</b></li>
                                <li><input type="checkbox" /> <b>38</b></li>
                                <li><input type="checkbox" /> <b>40</b></li>
                                <li><input type="checkbox" /> <b>42</b></li>
                                <li><input type="checkbox" /> <b>44</b></li>
                                <li><input type="checkbox" /> <b>46</b></li>
                                <li><input type="checkbox" /> <b>48</b></li>
                            </ul>
                            <br />
                        </div><br /><hr /><br />
                        <p >Precio</p>
                        <div className="box-precios">
                            <ul>
                                <li><input type="checkbox" /> <b>-$50.000</b></li>
                                <li><input type="checkbox" /> <b>-$80.000</b></li>
                                <li><input type="checkbox" /> <b>-$100.000</b></li>
                            </ul>
                        </div>
                    </aside>
                    <main>
                        <Box nombre='Nike Air Max 90'
                            precio='75000'
                            envioGratis={true}
                        />
                        <Box nombre='Nike Air Max 90'
                            precio='65000'
                            envioGratis={true}
                        />
                        <Box nombre='Nike Air Max 90'
                            precio='70000'
                            envioGratis={true}
                        />
                        <Box nombre='Nike Air Max 90'
                            precio='75000'
                            envioGratis={true}
                        />
                        <Box nombre='Nike Air Max 90'
                            precio='75000'
                            envioGratis={true}
                        />
                        <Box nombre='Nike Air Max 90'
                            precio='75000'
                            envioGratis={true}
                        />
                    </main>
                </div>
            )}
            {producto === 'mis datos' && (
                <div className="box-datos">
                    <div className="panel">
                        <h1>Bienvido {userDatos.nombre}</h1>
                        <div className="foto-user">
                            <img className="foto-userr" src={user} alt="" />
                        </div>
                        <p className="btn-volver" onClick={volver}>volver</p>
                    </div>
                    <div className="cont">
                        <div className="contenido">
                            <h1>Mi perfil</h1><br /><hr />
                            <div className="datosp">
                                <p className="p">Datos personales</p>
                                <ul>
                                    <li>
                                        <p>Nombre <input type="text" value={userDatos.nombre} readOnly></input></p>
                                        <img onClick={actualizarNombre} className="img-edit" src={edit} alt="a" />
                                    </li>
                                    <li>
                                        <p>Apellido <input type="text" value={userDatos.apellido} readOnly /></p>
                                        <img onClick={actualizarApellido} className="img-edit" src={edit} alt="a" />
                                    </li>
                                    <li>
                                        <p>DNI <input type="text" value={userDatos.dni} readOnly /></p>
                                    </li>
                                    <li>
                                        <p>Teléfono <input type="text" value={userDatos.telefono} readOnly /></p>
                                        <img className="img-edit" src={edit} alt="a" />
                                    </li>
                                </ul>
                            </div>
                            <div className="datosc">
                                <p className="p">Datos de tu cuenta</p>
                                <ul>
                                    <li>
                                        <p>Email <br /> <input className="we" type="text" value={userDatos.email} readOnly></input></p>
                                        <img onClick={actualizarEmail} className="img-edit" src={edit} alt="" />
                                    </li>
                                    <li>
                                        <button onClick={eliminarCuenta} className="eliminar-cuenta">Eliminar cuenta</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className="verDatosUsuario">
                        <ul>
                            <h2>Tus datos {userDatos.nombre}: </h2> <br />
                            <li>nombre: {userDatos.nombre} <button className="btn-actualizar" onClick={actualizarNombre} > actualizar</button></li>
                            <li>apellido: {userDatos.apellido} <button className="btn-actualizar" onClick={actualizarApellido} > actualizar</button></li>
                            <li>email: {userDatos.email} <button className="btn-actualizar" onClick={actualizarEmail} > actualizar</button></li>
                            <li>nombre de usuario: {userDatos.username} <button className="btn-actualizar" onClick={actualizarUsername} > actualizar</button></li><br /><br />
                            <p>¿Quieres eliminar tu cuenta? <button className="btn-eliminar" onClick={eliminarCuenta}> Eliminar cuenta</button></p>
                            <p onClick={volver}>volver</p>
                        </ul>
                    </div> */}
                </div>

            )}

            {/* <div className="productos">
                <p className="saludo">Bienvenido, {userDatos.nombre} </p> <hr />
                <ul>
                    <li onClick={obtenerZapatillas}>Zapatillas</li>
                    <li onClick={obtenerIndumentaria}>Indumentaria</li>
                    <li onClick={obtenerPromos}>Promos</li>
                </ul>
            </div> */}



        </div>

    );
}
/*
{producto === 'zapatillas' && (
                <>
                    <p className="msj-promo">ESTAS SON LAS ZAPAS PARA USUARIOS:</p>
                    <div className='zapas'>
                        {listaZapas.map((zapas, index) => (
                            <CajaUser key={index} props={zapas} />
                        ))}
                    </div>
                </>
            )}
            {producto === 'indumentaria' && (
                <>
                    <p className="msj-promo">TENEMOS LA MEJOR ROPA PARA VOS:</p>
                    <div className='zapas'>
                        {listaIndumentaria.map((ind, index) => (
                            <CajaIndumentaria key={index} props={ind} />
                        ))}
                    </div>
                </>
            )}
            {producto === 'promos' && (
                <>
                    <p className="msj-promo">TENEMOS LAS MEJORES PROMOS PARA VOS:</p>
                    <div className='zapas'>
                        {listaPromos.map((ind, index) => (
                            <CajaIndumentaria key={index} props={ind} />
                        ))}
                    </div>
                </>
            )}
            {producto === 'mis datos' && (
                <div className="verDatosUsuario">
                    <ul>
                        <h2>Tus datos {userDatos.nombre}: </h2> <br />
                        <li>nombre: {userDatos.nombre} <button className="btn-actualizar" onClick={actualizarNombre} > actualizar</button></li>
                        <li>apellido: {userDatos.apellido} <button className="btn-actualizar" onClick={actualizarApellido} > actualizar</button></li>
                        <li>email: {userDatos.email} <button className="btn-actualizar" onClick={actualizarEmail} > actualizar</button></li>
                        <li>nombre de usuario: {userDatos.username} <button className="btn-actualizar" onClick={actualizarUsername} > actualizar</button></li><br /><br />
                        <p>¿Quieres eliminar tu cuenta? <button className="btn-eliminar" onClick={eliminarCuenta}> Eliminar cuenta</button></p>
                    </ul>
                </div>
            )}*/