import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import List from './List';

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CategoryIcon from '@mui/icons-material/Category';
import AddchartIcon from '@mui/icons-material/Addchart';
import LogoutIcon from '@mui/icons-material/Logout';

import '../css/dashboard.css';

const Sidebar = ({ onSidebarClick }) => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const icons = [<CurrencyRupeeIcon />, <CategoryIcon />, <AddchartIcon />, <LogoutIcon />];
    // { backgroundColor: "#FBDCE2" }
    return (
        <>


            <div className="sidebar h-100">
                {/* <div class="sidebar"> */}
                <ul class="nav flex-column">

                    {['Expenses', 'Categories', 'Analyse', 'Logout'].map((text, index) => (

                        // <li class="nav-item">
                        //     <a class="nav-link" href="#">Settings</a>
                        // </li>
                        <div key={index} onClick={() => onSidebarClick(index)} >
                            <List icon={icons[index]} text={text} />
                        </div>
                    ))}
                </ul>
                {/* </div> */}
            </div>
        </>
    );
};

export default Sidebar;