import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import SettingsIcon from "@mui/icons-material/Settings";
import Card from "@material-ui/core/Card";
import Stack from "@mui/material/Stack";
import { Link } from "@mui/material";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Social({ authUser }) {
  // const [checked, setChecked] = React.useState(["wifi"]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  const data = [
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/733/733585.png",
      name: "Whatsapp",
    },
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/733/733558.png",
      name: "Instagram",
    },
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/733/733547.png",
      name: "Facebook",
    },
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/733/733579.png",
      name: "Twitter",
    },
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/1409/1409941.png",
      name: "Snapchat",
    },
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/174/174857.png",
      name: "Linkedin",
    },
    {
      link: "//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20Material-UI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro-material",
      image: "https://image.flaticon.com/icons/png/128/733/733609.png",
      name: "Github",
    },
  ];

  return (
    <Card>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        <Typography component="h1" variant="h5">
          Social Setting
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          subheader={<ListSubheader>Settings</ListSubheader>}
        >
          {authUser && authUser.socials.length > 0 ? (
            <Stack spacing={2}>
              {authUser &&
                authUser.socials.map(({ link, image, name }) => {
                  return (
                    <ListItem component={Link} href={link} target="_blank">
                      <ListItemIcon>
                        <img style={{ width: 30, height: 30 }} src={image} alt="1" />
                      </ListItemIcon>
                      <ListItemText id="switch-list-label-WhatsApp" primary={name} />
                    </ListItem>
                  );
                })}
            </Stack>
          ) : (
            <ListItem target="_blank">
              <ListItemText id="switch-list-label-WhatsApp" primary="This User have no socials" />
            </ListItem>
          )}
        </List>
      </Box>
    </Card>

    // <Card>
    //   <CssBaseline />
    //   <Box
    //     sx={{
    //       marginTop: 4,
    //       marginBottom: 4,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       // justifyContent: "space-between",
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Social Setting
    //     </Typography>
    //     <List
    //       sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    //       subheader={<ListSubheader>Settings</ListSubheader>}
    //     >
    //       <Stack spacing={3}>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/733/733585.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-WhatsApp" primary="WhatsApp" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("WhatsApp")}
    //             checked={checked.indexOf("WhatsApp") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-WhatsApp",
    //             }}
    //           />
    //         </ListItem>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/733/733558.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-Instagram" primary="Instagram" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("Instagram")}
    //             checked={checked.indexOf("Instagram") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-Instagram",
    //             }}
    //           />
    //         </ListItem>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/733/733547.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-Facebook" primary="Facebook" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("Facebook")}
    //             checked={checked.indexOf("Facebook") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-Facebook",
    //             }}
    //           />
    //         </ListItem>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/733/733579.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-Twitter" primary="Twitter" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("Twitter")}
    //             checked={checked.indexOf("Twitter") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-Twitter",
    //             }}
    //           />
    //         </ListItem>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/1409/1409941.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-snapchat" primary="Snapchat" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("snapchat")}
    //             checked={checked.indexOf("snapchat") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-snapchat",
    //             }}
    //           />
    //         </ListItem>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/174/174857.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-Linkedin" primary="Linkedin" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("Linkedin")}
    //             checked={checked.indexOf("Linkedin") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-Linkedin",
    //             }}
    //           />
    //         </ListItem>
    //         <ListItem>
    //           <ListItemIcon>
    //             <img
    //               style={{ width: 40, height: 40 }}
    //               src="https://image.flaticon.com/icons/png/128/733/733609.png"
    //               alt="1"
    //             />
    //           </ListItemIcon>
    //           <ListItemText id="switch-list-label-github" primary="Github" />
    //           <Switch
    //             edge="end"
    //             onChange={handleToggle("github")}
    //             checked={checked.indexOf("github") !== -1}
    //             inputProps={{
    //               "aria-labelledby": "switch-list-label-github",
    //             }}
    //           />
    //         </ListItem>
    //       </Stack>
    //     </List>
    //   </Box>
    // </Card>
  );
}
