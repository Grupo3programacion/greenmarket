import React, { useState, useEffect, useContext } from "react"; // Importa useState y useEffect de React
import "bootstrap/dist/css/bootstrap.min.css";
import { DataContext } from "../../context/Dataprovider";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Ganancias = () => {
    //const { productos } = useContext(DataContext); // Obtén el contexto del DataProvider
    const value = useContext(DataContext);
    const productos = value.productos[0];
    const [data, setData] = useState(productos); // inicializa la data
    const [modalActualizar, setModalActualizar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [form, setForm] = useState({
        id: "",
        title: "",
        price: "",
        image: "", 
        category: "",
    });

    useEffect(() => {
        setData(productos);
      }, [productos]);

      // Calcular la suma total de ganancias
    const totalGanancias = data.reduce((total, producto) => total + producto.ganancia, 0);

    const mostrarModalActualizar = (dato) => {
        setForm(dato);
        setModalActualizar(true);
    };

    const cerrarModalActualizar = () => {
        setModalActualizar(false);
    };

    const mostrarModalInsertar = () => {
        setModalInsertar(true);
    };

    const cerrarModalInsertar = () => {
        setModalInsertar(false);
    };

    const editar = (dato) => {
        const newData = data.map((item) =>
            item.id === dato.id ? { ...item, ...dato } : item
        );
        setData(newData);
        setModalActualizar(false);
    };

    const eliminar = (dato) => {
        const opcion = window.confirm(
            "¿Estás seguro que deseas eliminar el elemento " + dato.id + "?"
        );
        if (opcion) {
            const newData = data.filter((item) => item.id !== dato.id);
            setData(newData);
            setModalActualizar(false);
        }
    };

    const insertar = () => {
        const valorNuevo = { ...form, id: data.length + 1 };
        setData([...data, valorNuevo]);
        setModalInsertar(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
                if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div className="crudProductos">
            <h2 className="carrito__title"> Reporte de Ganancias de los productos vendidos</h2>
            <br></br>
            <br></br>
            <Container>


                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Producto</th>
                            <th>Precio Compra</th>
                            <th>Precio Vendido</th>
                            <th>Ganancia</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.title}</td>
                                <td>{dato.precioAdquirido}</td>
                                <td>{dato.price}</td>
                                <td style={{fontWeight: "bold"}}>{dato.ganancia}</td>
                                
                                
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{fontWeight: "bold", fontSize: "2rem"}}>Total</td>
                            <td style={{fontWeight: "bold", fontSize: "2rem"}}>{totalGanancias}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            
        </div>
    );
    
};

export default Ganancias;
