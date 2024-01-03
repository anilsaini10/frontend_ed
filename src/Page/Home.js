import { useCallback, useEffect, useRef, useState } from 'react';
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
    const [currency, setCurrency] = useState("USD");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [calculating, setCalculating] = useState(false);


    const getData = async () => {

        try {
            setLoading(true);

            let res = await axios.get("https://dzap-f4vc.onrender.com");
            // let res = await axios.get("http://localhost:3000/");

            if (res?.status == 200) {
                console.log("LIST ", res?.data);
                setCryptoList(res?.data?.data);
                setLoading(false);
            } else {
                setLoading(false);
                alert("Something went wrong, Please try again :(");
            }
        } catch (error) {
            alert("Error", error?.response?.message);
        }
    };

    const countRef = useRef()

    const getPrice = async (e) => {

        e.preventDefault();
        const input = {
            id: selectedCrypto,
            currency: currency
        }

        try {
            setCalculating(true);
            setShow(false);

            let res = await axios.post("https://dzap-f4vc.onrender.com/getPrice", input);
            // let res = await axios.post("http://localhost:3000/getPrice",
            //     input
            // );

            if (res?.status == 200) {
                res = res?.data?.data;
                for (let i in res) {
                    let key = (Object.keys(res[i]));
                    console.log(key, res[i][key]);
                    countRef.current = res[i][key];
                    setAmount(countRef.current);
                }
                setShow(true);
                setCalculating(false);
            } else {
                setCalculating(false);
                setShow(true);
                alert("Something went wrong, Please try again :(");
            }
        } catch (error) {
            alert("Error", error?.response?.message);
        };

    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <div className="main_Container" >

                <Box mb="20px" className="container__">
                    {loading && <text className="loading" >Fetching the data ...</text>}
                    <h1 className="heading" >Conversion</h1>
                    <Form className="form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select Crypto Currency</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={selectedCrypto}
                                onChange={(e) => { setSelectedCrypto(e.target.value); setShow(false); }}
                                className="create_admin_form_control"
                            >
                                <option>btc</option>
                                {
                                    cryptoList?.map((item, index) => {
                                        return (
                                            <>
                                                {item?.symbol != "btc" && <option value={item.id} >{item?.symbol}</option>}
                                            </>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Select Currency</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={currency}
                                onChange={(e) => { setCurrency(e.target.value); setShow(false); }}
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
                                onClick={(e) => { getPrice(e); }}
                            >
                                Calculate
                            </Button>
                        </div>

                        {calculating && <text className="calculating" >Calculating ...</text>}
                        <div className="output_container" >
                            <text className="text_style_1" >{show ? "Output" : (calculating ? "" : "Press the button")}</text>
                            {show && <> <div className="text_container" >
                                <div className='text_container_2' >

                                    <text className="text_style_2" >Selected Crypto</text>
                                </div>
                                <text className="text_style_3" >: {selectedCrypto}</text>
                            </div>

                                <div className="text_container" >
                                    <div className='text_container_2' >
                                        <text className="text_style_2" >Amount</text>
                                    </div>
                                    <text className="text_style_3" >{`: ${amount} ${currency}`}</text>
                                </div></>}
                        </div>

                    </Form>
                </Box>
            </div>
        </>
    );
};

export default CreateAdminUser;
