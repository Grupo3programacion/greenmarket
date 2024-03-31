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

const CrudProductos = () => {
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
            <h2 className="carrito__title">Insercion de Productos</h2>
            <br></br>
            <Container>

                <Button
                    color="success"
                    onClick={mostrarModalInsertar}
                >
                    Crear Producto
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Cantidad</th>
                            <th>Precio Venta</th>
                            <th>Nombre Proveedor</th>
                            <th>Precio Adquirido</th>
                            <th>Fecha Adquirido</th>
                            <th>Imagen</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.title}</td>
                                <td>{dato.category}</td>
                                <td>{dato.cantidad}</td>
                                <td>{dato.price}</td>
                                <td>{dato.nombreProveedor}</td>
                                <td>{dato.precioAdquirido}</td>
                                <td>{dato.fechaAdquirido}</td>
                                <td><img src={dato.image} alt={dato.title} style={{ width: "100px", height: "100px" }} /></td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            mostrarModalActualizar(dato)
                                        }
                                    >
                                        Editar
                                    </Button>{" "}
                                    <Button
                                        color="danger"
                                        onClick={() => eliminar(dato)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <h3>Editar Registro</h3>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>ID:</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={form.id}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input
                            className="form-control"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            value={form.title}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Precio:</label>
                        <input
                            className="form-control"
                            name="price"
                            type="text"
                            onChange={handleChange}
                            value={form.price}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Categoria:</label>
                        <input
                            className="form-control"
                            name="category"
                            type="text"
                            onChange={handleChange}
                            value={form.category}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad:</label>
                        <input
                            className="form-control"
                            name="cantidad"
                            type="text"
                            onChange={handleChange}
                            value={form.cantidad}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre Proveedor:</label>
                        <input
                            className="form-control"
                            name="nombreProveedor"
                            type="text"
                            onChange={handleChange}
                            value={form.nombreProveedor}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Precio Adquirido:</label>
                        <input
                            className="form-control"
                            name="precioAdquirido"
                            type="text"
                            onChange={handleChange}
                            value={form.precioAdquirido}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha Adquirido:</label>
                        <input
                            className="form-control"
                            name="fechaAdquirido"
                            type="text"
                            onChange={handleChange}
                            value={form.fechaAdquirido}
                        />
                    </FormGroup>
                    <FormGroup >
                        <label >Imagen :</label>
                        <input
                            /*-- Aca es para traer el url de esa imagen --*/
                            // className="form-control"
                            // name="image"
                            // type="text"
                            // onChange={handleChange}
                            // value={form.image}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
            />
                 
        </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => editar(form)}
                    >
                        Editar
                    </Button>
                    <Button
                        color="danger"
                        onClick={cerrarModalActualizar}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <h3>Insertar Producto</h3>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>ID:</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            value={data.length + 1}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input
                            className="form-control"
                            name="title"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Precio:</label>
                        <input
                            className="form-control"
                            name="price"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Categoria:</label>
                        <input
                            className="form-control"
                            name="category"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad:</label>
                        <input
                            className="form-control"
                            name="cantidad"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre Proveedor:</label>
                        <input
                            className="form-control"
                            name="nombreProveedor"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Precio Adquirido:</label>
                        <input
                            className="form-control"
                            name="precioAdquirido"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha Adquirido:</label>
                        <input
                            className="form-control"
                            name="fechaAdquirido"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Imagen :</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
            />
        </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={insertar}
                    >
                        Insertar
                    </Button>
                    <Button
                        color="danger"
                        onClick={cerrarModalInsertar}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
    
};

export default CrudProductos;
