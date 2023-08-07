import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	const [lista, setLista] = useState([])

	useEffect(() => {
		// fetch data
		const dataFetch = async () => {
			const data = await (
				await fetch('https://playground.4geeks.com/apis/fake/todos/user/pamela', {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})).json();

			// set state when the data received
			setLista(data);
		};

		dataFetch();
	}, [])

	useEffect(() => {
		actualizarTodos()
	}, [lista])

	function actualizarTodos() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/pamela', {
			method: "PUT",
			body: JSON.stringify(lista),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}

	const handleInput = (e) => {
		let tarea = e.target.value
		if (e.keyCode == 13 && tarea != "") {

			//Una segunda aproximación es usando el operador spread ...
			setLista([...lista, tarea])

		}
	}

	const deleteTask = (index) => {
		let tempArr = lista.slice() //copiar el estado lista en una variable auxiliar
		tempArr = tempArr.filter((item, index2) => { return index2 != index })
		setLista(tempArr)
	}

	return (
		<div className="container text-center mt-5 caja">
			<div className="container titulo"></div>
			<h1>todos</h1>
			<div className="hojas">
				<div className="justify-content start mt-2 shadow p-3 mb-5 bg-body">
					<input className="container" placeholder="What needs to be done?"
						onKeyUp={
							(e) => { handleInput(e) }
						} />

					<div>

						<ul className="list-group list-group-flush text-center">
							{
								lista && lista.length > 0 ?
									<>{
										lista.map((item, index) => {
											return <li className=" add list-group-item border" key={index}>
												{item}
												<button type="button" className=" boton btn btn-outline-light" onClick={e => { deleteTask(index) }}>
													<i class="far fa-trash-alt"></i>
												</button>
											</li>
										})
									}</>
									: "empty"
							}
						</ul>
					</div>
					<p className="agregado">{lista.length} items left</p>
				</div>
			</div>
		</div>
	);
};

export default Home;