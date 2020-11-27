import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Cards from './Cards';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';
import {getPatientsDetails} from '../Redux/PatientsRedux/actions'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { Link, useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor :'#009688'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor :'#009688',
    border : '1px solid #009688'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  stylingContent : {
      color: 'white',
      margin : '0px auto'
  }
}));

function ResponsiveDrawer(props) {
  let dynamicRouting = new URLSearchParams(useLocation().search)
  const { window } = props;
  const classes = useStyles();
  const patientArray = useSelector(state => state.patientReducer.patientArray)
  const [itemArray , setItemArray] = useState([])
  const [sorted,setSort] = useState(dynamicRouting.get("sorted") || null)
  const [filter,setFilter] = useState(dynamicRouting.get("filter") || null) 
  const theme = useTheme();
  const total = useSelector((state) => state.patientReducer.totalCount)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search,setSearch] = useState("")
  const dispatch = useDispatch()

  const history = useHistory()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    useEffect(() => {
        dispatch(getPatientsDetails(sorted , filter,1))
        history.push(`/?sorted=${sorted}&filter=${filter}`)
    }, [sorted , filter])

    const handlePageChange = ( event , value ) => {
        dispatch(getPatientsDetails(sorted,filter,value))
    }
  //   useEffect(() => {
  //     if(search === ""){
  //         setItemArray(patientArray)
  //     }
  //     else if(search != ""){
  //         let filterArray = patientArray.filter((item) =>item.patient_name === search )
  //         setItemArray(filterArray)
  //     }
  // }, [search])
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
       <div> <input className="h6 p-3 border rounded text-left mx-4" type="text" placeholder="Search By Name" onChange={(e) => setSearch(e.target.value)} style={{width:'80%',outline:'none'}}/></div>
      </List>
      <Divider />
      <List>
        <Link to='/addNew' style={{outline:'none',textDecoration : 'none',color : 'black'}}><div className="h5 border p-2 rounded text-left my-4 mx-4"> <AddToQueueIcon />ADD NEW DATA</div></Link> 
      </List>
      <Divider />
      <List>
        <div className="h5 border p-2 rounded text-left my-5 mx-4">  <SortIcon />
            <select name="age" className="border-0" onChange={(e) => setSort(e.target.value)}  style={{background:'#009688',outline:'none'}}>
                <option value=""> SORT BY AGE</option>
                <option value="Asc">Ascending</option>  
                <option value="Desc">Descending</option>
            </select>
        </div> 
      </List>
      <Divider />
      <List>
       <div className="h5 border py-2 px-1 rounded text-left my-4 mx-4"> <FilterListIcon/>
       <select name="age" className="border-0" onChange={(e) => setFilter(e.target.value)} style={{background:'#009688',outline:'none'}}>
                <option value="">FILTER BY SEX</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
            </select></div> 
      </List>
      
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className = {classes.stylingContent}>
                Doctor Patient Records
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
              
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Pagination count = {Math.ceil(total/2)}  onChange = {handlePageChange} shape="rounded" style={{display:'flex' , justifyContent:'center',paddingBottom:'20px'}}/>
            <Cards  sorted = {sorted} filters={filter} handlePageChange = {handlePageChange} />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
