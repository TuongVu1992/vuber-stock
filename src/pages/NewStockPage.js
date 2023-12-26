import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';

import SideBarService from '../services/SideBarService';
import InputSearchService from '../services/InputSearchService';
import { useParams } from 'react-router-dom';

//nested data is ok, see header
const StockTable = ({ data }) => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        header: 'Stock-Ticker',
        accessorKey: 'Stock',
        size: 150,
      },
      {
        header: '52-Week-Low',
        accessorKey: 'Low52',
        size: 150,
      },
      {
        header: 'Previous-Closing-Price',
        accessorKey: 'previous_close',
        size: 200,
      },
      {
        header: 'FCF-Target-Price',
        accessorKey: 'targetPrice',
        size: 150,
      },
      {
        header: 'Industry',
        accessorKey: 'industry',
        size: 150,
      },
      {
        accessorKey: 'PoliticanNameList.PoliticianList',
        header: 'Politican',
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>
              {/* Using map to loop through an array of values */}
              {renderedCellValue.map((value, index) => (
                <span key={index} style={{ marginRight: '0.5rem' }}>
                  {value}
                </span>
              ))}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: 'HedgeFundNameList.ManagerList',
        header: 'Hedge-Fund-Manager',
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>
              {/* Using map to loop through an array of values */}
              {renderedCellValue.map((value, index) => (
                <span key={index} style={{ marginRight: '0.5rem' }}>
                  {value}
                </span>
              ))}
            </span>
          </Box>
        ),
      },
    ],
    [],
  );

  //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  const table = useMaterialReactTable({
    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

// side bar placement and git to work as expected
const SideBar = ({
  hedgeFundValuePress,
  politicanValuePress,
  inputFieldPress,
}) => {
  const [hedgeFundValue, setHedgeFundValue] = useState();
  const [politicanValue, setPoliticanValue] = useState();
  const [inputFieldValue, setInputFieldValue] = useState();

  // handle fund manager press
  const handleKeyPressFund = (event) => {
    if (event.key === 'Enter') {
      hedgeFundValuePress(hedgeFundValue);
    }
  };

  const handleChangeFundValue = (event) => {
    setHedgeFundValue(event.target.value);
  };

  // handle press for politicians when you press the input button
  const handleKeyPressPolitican = (event) => {
    if (event.key === 'Enter') {
      politicanValuePress(politicanValue);
    }
  };

  const handleChangePoliticanValue = (event) => {
    setPoliticanValue(event.target.value);
  };

  // handle input field when you press the input button
  const handleKeyPressInputField = (event) => {
    if (event.key === 'Enter') {
      inputFieldPress(inputFieldValue);
    }
  };

  const handleChangeInputField = (event) => {
    setInputFieldValue(event.target.value);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '200px',
            height: '200vh',
            backgroundColor: '#333',
            position: 'fixed',
            color: '#fff',
            left: 0,
            top: 0,
          }}
        >
          <TextField
            label="Politican Name"
            sx={{
              borderRadius: '10%',
              backgroundColor: 'white',
              marginTop: '100px',
              width: '182px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
            value={politicanValue}
            onChange={handleChangePoliticanValue}
            onKeyDown={handleKeyPressPolitican}
          />

          <TextField
            label="Hedge Fund"
            sx={{
              borderRadius: '10%',
              backgroundColor: 'white',
              marginTop: '10px',
              width: '182px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
            value={hedgeFundValue}
            onChange={handleChangeFundValue}
            onKeyDown={handleKeyPressFund}
          />

          <TextField
            label="Stock Symbol: i.e. AAPL"
            sx={{
              borderRadius: '10%',
              backgroundColor: 'white',
              marginTop: '10px',
              width: '182px',
              marginLeft: '10px',
              marginRight: '10px',
            }}
            value={inputFieldValue}
            onChange={handleChangeInputField}
            onKeyDown={handleKeyPressInputField}
          />
        </div>

        {/* this place holder for input field */}
        <div style={{ marginLeft: '220px', padding: '20px' }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <Input
                  onChange={handleChangeInputField}
                  onKeyDown={handleKeyPressInputField}
                  placeholder="Stock Ticker Symbol"
                />
              </InputAdornment>
            }
            label="Amount"
          />
        </div>
      </div>
    </>
  );
};

// this is logic to pull data for based on headge fund manager name and politician
const hedgeFundandPoliticanPullData = async (
  jwtToken,
  inputName,
  checkWhoEvok,
) => {
  try {
    let pullData;
    if (checkWhoEvok === 'Politician') {
      pullData = await SideBarService.PoliticianStock(jwtToken, inputName);
    }
    if (checkWhoEvok === 'HedgeFund') {
      pullData = await SideBarService.HedgeFundStock(jwtToken, inputName);
    }

    // merge all data need into one array for the table
    const tableData = pullData.dividendPricePE.map((element) => {
      return {
        Stock: element.Stock,
        Low52: element.fifty_two_week_low,
        previous_close: element.previous_close,
      };
    });

    // Use Promise.all to handle asynchronous operations
    await Promise.all(
      tableData.map(async (stock) => {
        const targetPricePromise = pullData.listofStockPlusTarget
          .filter((item) => item.Stock === stock.Stock)
          .map((item) => item.Target_Price);

        const industryPromise = pullData.summaryStockData
          .filter((item) => item.stock === stock.Stock)
          .map((item) => item.industry);

        const politicanNameListPromise = SideBarService.PoliticanNameList(
          jwtToken,
          stock.Stock,
        );
        const hedgeFundNameListPromise = SideBarService.HedgeFundNameList(
          jwtToken,
          stock.Stock,
        );

        const [targetPrice, industry, politicanNameList, hedgeFundNameList] =
          await Promise.all([
            targetPricePromise,
            industryPromise,
            politicanNameListPromise,
            hedgeFundNameListPromise,
          ]);

        stock.targetPrice = String(targetPrice);
        stock.industry = String(industry);
        stock.PoliticanNameList = politicanNameList;
        stock.HedgeFundNameList = hedgeFundNameList;
      }),
    );

    return tableData;
  } catch (error) {
    console.error('Error fetching authentication data:', error);
  }
};

const NewStockPage = () => {
  const [politicanStock, setPoliticanStock] = useState([]);
  const [hedgeStock, setHedgeStock] = useState([]);
  const [individualStock, setIndividualStock] = useState([]);
  const { jwtToken } = useParams();

  // search for stocks based on the Politician
  const getPoliticanSearch = async (managerName) => {
    const pullData = await hedgeFundandPoliticanPullData(
      jwtToken,
      managerName,
      'Politician',
    );
    setPoliticanStock(pullData);
  };

  // search for stocks based on hedge name
  const gethedgeSearch = async (hedgeName) => {
    const pullData = await hedgeFundandPoliticanPullData(
      jwtToken,
      hedgeName,
      'HedgeFund',
    );
    setPoliticanStock(pullData);
  };

  // search for individual stock
  const getInputSearch = async (stockSymbol) => {
    try {
      if (
        individualStock.length > 0 &&
        individualStock.some((company) => company.Stock === stockSymbol)
      ) {
        return;
      }

      const inputSearch = await InputSearchService.InputSearch(
        jwtToken,
        stockSymbol,
      );

      const tableData = {
        Stock: inputSearch.dividendPricePE[0].Stock,
        Low52: inputSearch.dividendPricePE[0].fifty_two_week_low,
        previous_close: inputSearch.dividendPricePE[0].previous_close,
        targetPrice: inputSearch.StockPlusTarget[0].Target_Price,
        industry: inputSearch.summaryStockData[0].industry,
        PoliticanNameList: {
          PoliticianList: inputSearch.politicanList,
        },
        HedgeFundNameList: {
          ManagerList: inputSearch.hedgeFundManager,
        },
      };

      setIndividualStock((old) => [...old, tableData]);
    } catch (error) {
      console.error('Error fetching authentication data:', error);
    }
  };

  // this is where you store the value of the hedgeFund and call it api
  const politicanValuePress = (data) => {
    setIndividualStock('');
    getPoliticanSearch(data);
  };

  // this is where you store the value of the hedge  stock and call it api
  const hedgeFundValuePress = (data) => {
    setIndividualStock('');
    gethedgeSearch(data);
  };

  // this is where you can the value of the input field
  const inputFieldPress = (data) => {
    // setHedgeStock('');
    setPoliticanStock('');
    getInputSearch(data);
  };

  return (
    <>
      <div>
        <SideBar
          politicanValuePress={politicanValuePress}
          hedgeFundValuePress={hedgeFundValuePress}
          inputFieldPress={inputFieldPress}
        />
      </div>
      <div>
        <Stack direction="column" spacing={2} style={{ marginLeft: '250px' }}>
          <Box
            sx={{
              width: '2000px',
              position: 'flex',
              paddingBottom: '100px',
            }}
          >
            {politicanStock.length > 0 && <StockTable data={politicanStock} />}

            {individualStock.length > 0 && (
              <StockTable data={individualStock} />
            )}
          </Box>
        </Stack>
      </div>
    </>
  );
};

export default NewStockPage;
