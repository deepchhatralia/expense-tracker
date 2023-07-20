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

    return (
        <>
            <div className="sidebar" style={{ backgroundColor: "#FBDCE2" }}>
                {['Expenses', 'Categories', 'Analyse', 'Logout'].map((text, index) => (

                    <div key={index} onClick={() => onSidebarClick(index)} >
                        <List icon={icons[index]} text={text} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Sidebar;