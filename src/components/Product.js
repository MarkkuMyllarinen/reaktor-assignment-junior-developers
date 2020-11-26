import React, { useEffect, useState } from 'react';
import Table from './Table'
import "./Product.css"
import _ from 'lodash';

export default function Product(props) {

    const [listOfProduct, setProductList] = useState([]);
    const [listOfManu, setListOfManu] = useState([]);
    const [mergedListInfo, setMergedList] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const [loadingText, setLoadingText] = useState("Loading...");
    let listOfAll = []
    let mergedList = []


    useEffect(() => {
        const fetchProducts = () => {
            fetch("https://bad-api-assignment.reaktor.com/products/" + props.name)
                .then(response => response.json())
                .then(response => {
                    setProductList(response)
                })
                .catch(error => console.log(error))
        }
        fetchProducts();
    }, [])

    useEffect(() => {
        const fetchManufacturer = () => {
            if (listOfProduct.length > 0) {
                let listOfManufacturers = ["reps", "abiplos", "nouke", "derp", "xoon"]
                let repeatLimitCounter = 0
                listOfManufacturers.forEach(manuName => {
                    const fetchManu = () => {
                        fetch("https://bad-api-assignment.reaktor.com/availability/" + manuName, {
                            // headers: { "x-force-error-mode": "all" }
                        })
                            .then(response => response.json())
                            .then(response => {
                                if (response.response.length > 2) {
                                    response.response.forEach(item => listOfAll.push(item))
                                    if (listOfAll.length > 40000) {
                                        setListOfManu(listOfAll)
                                    }
                                } else if (response.response.length === 2) {                    //Error handling if response is not correct
                                    if (repeatLimitCounter <= 2) {
                                        console.log("Error, trying to repeat fetch")
                                        repeatLimitCounter++;                                   //Limiting recursive loop
                                        fetchManu();
                                    } else {
                                        console.log("Fetch error, api does not respond")
                                        setLoadingText("Error :(")
                                    }
                                }
                            })
                            .catch(error => console.log(error))
                    }
                    fetchManu();
                })
            }
        }
        fetchManufacturer();
    }, [listOfProduct])

    useEffect(() => {
        if (listOfManu.length > 0 && listOfProduct.length > 0) {
            for (let i = 0; i < listOfProduct.length; i++) {
                let item = listOfProduct[i]
                let availability = (_.find(listOfManu, ["id", item.id.toUpperCase()]))
                let aavailability = availability.DATAPAYLOAD.toString().replace("<AVAILABILITY>", "").replace("</AVAILABILITY>", "").replace("</INSTOCKVALUE>", "").replace("<INSTOCKVALUE>", "")

                item["availability"] = aavailability
                mergedList.push(item)
            }
            setMergedList(mergedList)
            setIsDone(true)
        }
    }, [listOfManu])


    const columns = React.useMemo(
        () => [
            {
                Header: 'Info',
                columns: [{
                    Header: "Availability",
                    accessor: 'availability',
                }, {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Type',
                    accessor: 'type',
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {
                    Header: 'Color',
                    accessor: 'color',
                },
                {
                    Header: 'Price',
                    accessor: 'price',
                },
                {
                    Header: 'Manufacturer',
                    accessor: 'manufacturer',
                },
                ],
            },
        ], []
    )

    if (isDone) {
        const data = mergedListInfo;
        return (
            <div>
                <h1 className="title" > {props.name} </h1>
                <Table columns={columns}
                    data={data} defaultPageSize={20}> </Table> </div>
        );
    } else {
        return (
            <div>
                <h1 className="title" > {props.name}  </h1>
                <h1>{loadingText}</h1> </div>
        );
    }

}