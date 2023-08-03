import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState(["Desayunar", "Ponerme al día en Jujutsu", "Salir a correr"])

	const handleInput = (e) => {
		let texto = e.target.value
		if (e.keyCode == 13) {
			setTarea(texto)
			//Una primera aproximación para agregar a la lista es usando una variable auxiliar
			//let tempArr = lista.slice() //copia de arreglo por valor
			//tempArr.push(texto)
			//setLista(tempArr)

			//Una segunda aproximación es usando el operador spread ...
			setLista([...lista, texto])
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





