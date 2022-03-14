import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { listUO } from '../../Config/UO';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import PaginationTable from '../PaginationTable';
import { createCvs, createJSON } from '../../utils/CreateCsv';
import Footer from '../Footer';

Modal.setAppElement('#root');

let raw = {};
function Header() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [valueRaw, setRaw] = useState('');
    const { register, handleSubmit } = useForm();
    const onSubmit = data => { ValidateData(data) }

    const customStyle = {
        content: {
            top: '12%',
            left: '5rem',
            right: '5rem',
            bottom: '1rem',
            marginTop: '1rem'
        }
    }

    function ValidateData(data) {
        let vazio = 0;

        Object.keys(data).forEach((item) => {
            if (!data[item]) {
                vazio++
            }
            else {
                if (item === 'codUnidadeOrcamentaria') {
                    if (data[item] !== 'true') {
                        raw = { ...raw, [item]: data[item] }
                    }
                }
                else raw = { ...raw, [item]: data[item] }
            }
        })

        if (vazio === 5 && data.codUnidadeOrcamentaria === 'true') {
            alert('Informe ao menos um campo')

        }
        else {
            handleOpenModal();
            setRaw(JSON.stringify(raw))
        }
    }

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        setRaw(JSON.stringify(raw))
    }, [valueRaw]);

    function toCsv(){
        createCvs(valueRaw);
    }

    function toJSON(){
        createJSON(valueRaw)
    }



    return (
        <Container >
            <Row id="empenho" className='empenho'></Row>
            <h1>Consulta de Pagamentos por Credor</h1>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Row  >
                    <Col xl={2} lg={3} md={3} sm={4} >
                        <Form.Group className="mb-3" controlId="Cpf">
                            <Form.Label>CPF/CNPJ</Form.Label>
                            <Form.Control type="text" placeholder="Digite CPF/Cnpj" {...register("cpfCnpj")} />
                        </Form.Group>
                    </Col>
                    <Col xl={5} lg={5} md={6} sm={8} >
                        <Form.Group className="mb-3 " controlId="razaoSocial">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="nome"  {...register("razaoSocial")} />
                        </Form.Group>
                    </Col>
                    <Col xl={2} lg={3} md={3} sm={4} >
                        <Form.Group className="mb-3 " controlId="codExercicio">
                            <Form.Label>Exercicio</Form.Label>
                            <input id='inputexercicio'
                                type="number"
                                placeholder="exercicio"
                                {...register("codExercicio")} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xl={3} lg={3} md={3} sm={5} >
                        <Form.Group className="mb-3" controlId="dataInicial">
                            <Form.Label>Data Inicial</Form.Label>
                            <Form.Control type="date" {...register("dataInicial")} />
                        </Form.Group>
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={5} >
                        <Form.Group className="mb-2" controlId="dataFinal"  >
                            <Form.Label>Data Final</Form.Label>
                            <Form.Control type="date" {...register("dataFinal")} />
                        </Form.Group>
                    </Col>
                    <Col lg={5} md={8} sm={9} xl={4} xxl={4} >
                        <Form.Group className="mb-3" controlId="formCpf">
                            <Form.Label>Unidade Orçamentária</Form.Label>
                            <select className="form-select form-select-sm mb-3" {...register("codUnidadeOrcamentaria")}>
                                <option defaultValue value>Selecione Unidade </option>
                                {listUO.map(uo => <option key={uo.codigo} value={uo.codigo} >{uo.descricao}</option>)}
                            </select>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mb-3" variant="primary" type="submit">
                    Consultar
                </Button>
            </Form>
            <Row id='progress' className="progressIndicator">
            </Row>
            <Container>
                {/* <Remote /> */}
                <div className='modal'>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                        style={customStyle}
                    >
                        <Row className="buttons">
                            <Col>
                                {/* <Col sm={6}> */}
                                <ButtonGroup aria-label="Basic example">
                                    <Button onClick={toCsv} variant="primary">Csv</Button>
                                    <Button onClick={toJSON} variant="primary">JSON</Button>
                                </ButtonGroup>
                                {/* </Col> */}
                                {/* <Col sm={6}> */}
                            </Col>
                            <Col>
                                <Button className='buttonClose' onClick={handleCloseModal}>
                                    <center>X</center>
                                </Button>
                            </Col>

                        </Row>
                        <Row>
                            <div className="lineTable">
                                <PaginationTable aData={valueRaw} />
                            </div>
                        </Row>
                    </Modal>
                </div>
            </Container>
            <Footer />

        </Container>
    )
}

export default Header;
