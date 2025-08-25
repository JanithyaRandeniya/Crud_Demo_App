'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  IconButton,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerClose = () => setDrawerOpen(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const drawerLinks = [
    {
      name: 'Dashboard',
      icon: <GridViewOutlinedIcon />,
      path: '/admin',
    },
  ];

  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Link href="/admin">
          <StorefrontIcon
            sx={{
              fontSize: { xs: 35, sm: 45 },
              color: 'hsla(185, 64%, 39%, 1.0)',
              cursor: 'pointer',
            }}
          />
        </Link>
      </Toolbar>

      <Divider />

      <List>
        {drawerLinks.map((drawLink, index) => (
          <ListItem key={index} disablePadding onClick={handleDrawerClose}>
            <Link href={drawLink.path}>
              <ListItemButton>
                <ListItemIcon>{drawLink.icon}</ListItemIcon>
                <ListItemText
                  primary={drawLink.name}
                  sx={{ color: 'rgb(75, 85, 99)' }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#ffffff', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Permanent drawer for desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Temporary drawer for mobile */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          color: 'rgb(75, 85, 99)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
