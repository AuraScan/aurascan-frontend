import React, { useEffect,useRef,useState,useMemo } from 'react';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Row, Col, Navbar, Nav, Container, NavDropdown, Overlay, Alert, Badge ,InputGroup,Form, Modal,ListGroup} from 'react-bootstrap'

import Button from 'react-bootstrap/Button';
import { useDispatch,useSelector } from 'react-redux';
import { getPublicAddress,getPuzzleWallet,setPublicAddress,setPuzzleWallet,setInitWallet } from '@/store/rootReducer';
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import BaseModals from '@/components/modals'
import { getAccount } from "@puzzlehq/sdk-core"
// import logo from '@/assets/images/logo_aleo.png'
import logo from '@/assets/images/aurascan.svg'
import leo from '@/assets/images/leo.png'
import puzzle from '@/assets/images/puzzle.png'
import { shortenWalletAddress } from '@/utils';




export const HeadApp = () => {
    const publicAddress = useSelector(getPublicAddress);
    const puzzleWallet=useSelector(getPuzzleWallet);
    // let init_wallet=;
    const [init_wallet, setInit_wallet] = useState(localStorage.getItem('init_wallet'));
    const currentMode=JSON.parse(localStorage.getItem('isDarkMode'));
    const [show, setShow] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState('dark');
    const [address, setAddress] = useState('');
    const [account, setAccount] = useState({});
    const [infoshow, setInfoShow] = useState(false);
    const [modelshow, setModelshow] = useState(false);
    const [modelSearchShow, setModelSearchShow] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(currentMode);
    const [error, setError] = useState('');
    
    const pathname = window.location.pathname

    
    const target = useRef('');
    
    const handleChange=(event) =>{
        // console.log("搜索的输入框值：",event.target.name,event.target.value)
        setSearchInput( event.target.value );
    }

    const handleClose = () => setModelshow(false);
    const handleShow = () => setModelshow(true); 

    const wallets = useMemo(
            () => [
            new LeoWalletAdapter({
                appName: "Leo Demo App",
            }),
            ],
            []
    );

    const onConnectLeo = () => { 
        setLoading(true)
    };

    const onConnectPuzzle = () => { 
        setLoading(true)
       
    }
    // 切换模式的函数
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('isDarkMode',JSON.stringify(!isDarkMode));
    };
    useEffect(() => {
        setInfoShow(false)
        initAccount()
        // 初始化wallet 
        
        const body = document.body;
        if (isDarkMode) {
            body.classList.add('dark-mode');
            setTheme('light')
        } else {
            body.classList.remove('dark-mode');
            setTheme('light')
        }
    }, [isDarkMode])

    const handleSearch = async() => { 
        console.log("search")

        const _this = this;
        let url = '/api/v2/aleo/search/'+searchInput;
        fetch(url, {
          method: 'get',
          headers: {
              'Content-Type': 'application/json'
          }
        })
        .then((response) => {
            if (response.status == 200) {
              return response.json()
            } else {
              return []
            }
        })
      .then(data => {
          // 更新组件状态
        if(data.code=200){
            const ret_data=data.data
            // data==1 高度,
            // data==2 block hash
            // data==3 transaction
            // data==4 transition
            // data==5 prover/validator
            // data==6 program
            if(ret_data==1){
                location.href='/block/'+searchInput
            }else if(ret_data==2){
                location.href='/block/'+searchInput
            }else if(ret_data==3){
                location.href='/transactions/'+searchInput
            }else if(ret_data==4){
                location.href='/transitions/'+searchInput
            }else if(ret_data==5){
                location.href='/address/'+searchInput
            }else if(ret_data==6){
                location.href='/programs/'+searchInput
            }else{
                //弹框报错
                setModelSearchShow(true)
            }
        }

    
        })
          .catch((error) => { 
          setLoading(false);
          })
    }
    const initAccount=async()=>{
        setLoading(true);
        setError(undefined);
        console.log("Head >initAccount",init_wallet,init_wallet == 'leo',)
        // if(init_wallet == 'leo'){
        //     onConnectLeo();
        // }else if(init_wallet == 'puzzle'){
        //     onConnectPuzzle();
        // }
        // else{
            try {
                const response = await getAccount()
                console.log("puzzle > response",response);
                if (response.account) setAccount(response.account);
                else if (response.error) setError(response.error);
              } catch (e) {
                setError((e).message);
              } finally {
                setLoading(false);
              }
        // }

    }
    const buttonText = (() => {
        console.log("Head>buttonText:",init_wallet,address,"-",account,"-",publicAddress)
        if (account && Object.keys(account).length!==0 && init_wallet=='puzzle') { //puzzle
            return <><img src={puzzle} style={{width:'14px'}}/> {shortenWalletAddress(publicAddress)}</>
        }else if(publicAddress !='' && init_wallet=='leo'){
            return <><img src={leo} style={{width:'14px'}}/> {shortenWalletAddress(publicAddress)}</>
        }
        else if (loading) {
          return 'Connecting...'
        } else {
          return 'Connect Wallet'
        }
      })()
    const homeSearch=()=>{
            return <><Col sm={4} md={4} className='text-right' >
            <InputGroup className='home-search' >
            <Form.Control className='input-box' placeholder="Search by Transaction ID / Program ID / Block Height / Address"  value={searchInput} name="searchInput" onKeyUp={handleChange}  onChange={handleChange} />
            <InputGroup.Text className='search-icon-box'>
                <Button variant="outline-primary" className='search-icon' onClick={handleSearch}>
                    <span className="icon iconfont" >&#xe600;</span>
                </Button>
            </InputGroup.Text>
            </InputGroup>
        </Col> 
        <Col sm={2} md={2}  className='right-area'  style={{paddingTop:'15px',paddingBottom:'5px'}}>
            <Button variant={theme} className='text-xs' style={{ marginLeft: '5px', boxShadow: '3px 3px 10px 0 rgba(0, 0, 0, 0.5)' }} onClick={handleShow}>
                {buttonText}
            </Button> 
        </Col>
        
        <BaseModals isShow={modelSearchShow} status="danger" content='No Result'></BaseModals>
        </>
        // }
        // return <Col sm={6} md={6} className='right-area'>
        // <Container className='header' >
        // <Row style={{paddingTop:'10px',paddingBottom:'5px'}}><Col></Col>
        //     <Col className='right-area'>
        //     <Button variant="dark" className='text-xs' style={{ marginLeft: '5px' }} onClick={handleShow}>Connect Wallet</Button> 
        //     <Badge className='modeSet' bg={theme}  style={{marginTop: '0.5em'}} onClick={toggleDarkMode}>{isDarkMode == true ? <i className="iconfont text-xs" style={{color:'#000',fontSize:'16px'}}>&#xe635;</i>:<i className="iconfont text-xs" style={{fontSize:'16px'}}>&#xe62e;</i> }</Badge>

        //     {/* <Badge className='modeSet' bg="dark"  style={{marginTop: '0.5em'}} onClick={toggleDarkMode}>{isDarkMode == true ? <i className="iconfont text-xs"> &#xe64c;</i>:<i className="iconfont text-xs"> &#xe600;</i> }</Badge> */}
        //     {/* <Dropdown  align="start" className='languageSet' style={{ marginLeft: '5px' }}>
        //         <Dropdown.Toggle className='borderbackNone' id="dropdown-basic">
        //         <Badge bg="dark" > <i className="iconfont text-xs"> &#xe601;</i></Badge>
        //         </Dropdown.Toggle>
        //         <Dropdown.Menu>
        //             <Dropdown.Item href="#" className='text-xs'>中文</Dropdown.Item>
        //             <Dropdown.Item href="#" className='text-xs'>英文</Dropdown.Item>
        //         </Dropdown.Menu>
        //     </Dropdown> */}
        //     </Col>
        // </Row>
        // </Container>
        // </Col>
    }
   
    return (
        <>
      
            {/* <Container className='header'> */}
                <Row className='header' style={{width:'100%',display:'flex'}}>
                    <Col sm={6} md={6} className='left-area'>
                        <Container>
                                <a href='/' className='logo' style={{}}>
                                    {/* <LogoSvg style={{ width: '140px',color:'red', marginRight: '10px'}}></LogoSvg> */}
                                    <img src={logo} alt="" style={{ width: '140px', marginRight: '10px'}} />             
                                </a>
                                <Navbar className='left-nav' >
                            {/* <Container> */}
                                <Nav className="me-auto">
                                    {(pathname == '/blocks' || pathname == '/transactions' || pathname == '/transitions')==true ? (<NavDropdown title="Blockchain" id="basic-nav-dropdown" className='mTop5 text-sm active'> <NavDropdown.Item href="/blocks">Blocks</NavDropdown.Item>
                                        <NavDropdown.Item href="/transactions">Transactions</NavDropdown.Item>
                                        <NavDropdown.Item href="/transitions">Transitions</NavDropdown.Item>     
                                        </NavDropdown>
                                    ) : (<NavDropdown title="Blockchain" id="basic-nav-dropdown" className='mTop5 text-sm'>
                                        <NavDropdown.Item href="/blocks">Blocks</NavDropdown.Item>
                                        <NavDropdown.Item href="/transactions">Transactions</NavDropdown.Item>
                                        <NavDropdown.Item href="/transitions">Transitions</NavDropdown.Item>     
                                        </NavDropdown>)}
                                    {pathname=='/validators' ? (<Nav.Link href="/validators" className='mTop5 text-sm active'> Validators</Nav.Link>):(<Nav.Link href="/validators" className='mTop5 text-sm'> Validators</Nav.Link>)}
                                    {pathname == '/programs' ? (<Nav.Link href="/programs" className='mTop5 text-sm active'> Programs</Nav.Link>) : (<Nav.Link href="/programs" className='mTop5 text-sm'> Programs</Nav.Link>)}
                                    {pathname == '/provers' ? (<Nav.Link href="/provers" className='mTop5 text-sm active'> Provers</Nav.Link>) : (<Nav.Link href="/provers" className='mTop5 text-sm'> Provers</Nav.Link>)}       
                                    {pathname == '/favorites' ? (<Nav.Link href="/favorites" className='mTop5 text-sm active'> Favorites</Nav.Link>) : (<Nav.Link href="/favorites" className='mTop5 text-sm'> Favorites</Nav.Link>)} 
                                </Nav>
                            {/* </Container> */}
                        </Navbar>  
                                    {/* <span style={{ fontSize: '12px', marginLeft: '20px', color: '#9c9c9b' }}>
                                        <Link style={{color:'red',fontSize:'20px',fontWeight:'bolder',marginRight:'10px'}}></Link>
                                    Connected to:
                                    Leo Wallet
                                    </span> */}
                        </Container>
                    </Col>
                    {homeSearch()}
                <Col xs={12}>
                    <Overlay target={target.current} show={show} placement="bottom">
                    {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                    }) => (
                    <div
                        {...props}
                        style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style,
                        }}
                    >
                        Please install the Leo wallet extension
                    </div>
                    )}
                    </Overlay>

                    <Alert key={"info"} variant={"info"} show={infoshow} onClose={() => setInfoShow(false)} dismissible>
                            <Alert.Heading style={{width:'50%',textAlign:'left',margin:'0 auto',marginBottom:'25px'}}>Oh snap! You got an error! </Alert.Heading>
                            <p style={{width:'50%',textAlign:'left',margin:'0 auto'}}>Please check<br></br>

                                1. Is the LEO wallet xtention installed<br></br>

                                2. Do you create or own a LEO wallet account
                                <br></br>
                                <a href='/start'>Help</a>
                            </p> 
                    </Alert>
                </Col>        
                </Row>
            {/* </Container> */}
            {/* wallet choose model */}
            <Modal className='walletSelectModel'
              aria-labelledby="contained-modal-title-vcenter"
              centered
            show={modelshow} onHide={handleClose}>
                <Modal.Header closeButton>
                   <Modal.Title className='walletSelectModeltitle' style={{fontSize:'15px'}}>Connect a wallet on Aleo to continue</Modal.Title>
                </Modal.Header>
                <Modal.Body className='walletSelectModelbody'>
                <ListGroup as="ol" numbered>
                    <ListGroup.Item as="li" onClick={()=>{
                        onConnectLeo()
                        handleClose();
                    }}>
                     <span className='left-name'>
                        
                        <img src={leo} alt="" style={{ width: '28px', marginRight: '10px'}} />
                        leo Wallet</span> 
                     <span className='right-state'>{wallets[0].readyState}</span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                    <span className='left-name' onClick={()=>{
                        onConnectPuzzle();
                        handleClose();
                    }}>
                    <img src={puzzle} alt="" style={{ width: '28px', marginRight: '10px'}} />
                    Puzzle Wallet
                        {/* <PuzzleConnectPage></PuzzleConnectPag e> */}
                        </span> 
                    <span className='right-state'>Detected</span>
                    </ListGroup.Item>
                    {/* <ListGroup.Item as="li">
                    <a href="https://foxwallet.com/download">
                        <span className='left-name'>Fox Wallet</span> 
                    </a>
                    </ListGroup.Item> */}
                </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
                </Modal.Footer>
            </Modal>
    </>
    )

}
