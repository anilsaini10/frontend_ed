import { useEffect, useState } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Box } from "@mui/material";
import "./Home.css"
import { CurrencyList } from '../Constants/Constatns';

const CreateAdminUser = () => {


    const [cryptoList, setCryptoList] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState("BTC");
    const [amount, setAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [currency, setCurrency] = useState("USD");
    const [show, setShow] = useState(false);


    const getData = async () => {

        try {

            let res = await axios.get("http://localhost:3000/");

            if (res?.status == 200) {
                console.log(res?.data);
                setCryptoList(res?.data?.data);
            } else {
                alert("Something went wrong, Please try again :(");
            }
        } catch (error) {
            alert("Error", error?.response?.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <>
            <div className="main_Container" >

                <Box mb="20px" className="container__">
                    <h1 className="heading" >Conversion</h1>
                    <Form className="form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select Crypto Currency</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={selectedCrypto}
                                onChange={(e) => setSelectedCrypto(e.target.value)}
                                className="create_admin_form_control"
                            >
                                <option>Select Cyrpto</option>
                                {
                                    cryptoList?.map((item, index) => {
                                        return (
                                            <option>{item?.symbol}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter email"
                                value={amount}
                                required
                                onChange={(e) => setAmount(e.target.value)}
                                className="create_admin_form_control"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select Currency</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="create_admin_form_control"
                            >
                                {CurrencyList?.map((item, index) => {
                                    return (
                                        <option>{item?.code}</option>
                                    )
                                })} </Form.Select>
                        </Form.Group>

                        <div className="button_container" >
                            <Button
                                variant="primary"
                                className="submit_button"
                                type="submit"
                                onClick={(e) => {
                                }}
                            >
                                Submit
                            </Button>
                        </div>

                        <div className="output_container" >
                            <text className="text_style_1" >Output</text>
                            <div className="text_container" >
                                <div className='text_container_2' >

                                <text className="text_style_2" >Selected Crypto</text>
                                </div>
                                <text className="text_style_3" >: {selectedCrypto}</text>
                            </div>
                            <div className="text_container" >
                                <div className='text_container_2' >

                                <text className="text_style_2" >Quantity</text>
                                </div>
                                <text className="text_style_3" >: {amount}</text>
                            </div>

                            <div className="text_container" >
                                <div className='text_container_2' >
                                    <text className="text_style_2" >Total Amount</text>
                                </div>
                                <text className="text_style_3" >: {totalAmount} {currency}</text>
                            </div>
                        </div>

                    </Form>
                </Box>
            </div>
        </>
    );
};

export default CreateAdminUser;
