/**
=========================================================
* Soft UI Dashboard Material-UI - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @material-ui core components
import Link from "@material-ui/core/Link";
import Icon from "@material-ui/core/Icon";

// Soft UI Dashboard Material-UI components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Material-UI base styles
import typography from "assets/theme/base/typography";

// Custom styles for the Footer
import styles from "examples/Footer/styles";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;
  const classes = styles();

  const renderLinks = () =>
    links.map((link) => (
      <SuiBox key={link.name} component="li" px={2}>
        <Link href={link.href} target="_blank">
          <SuiTypography variant="button" fontWeight="regular" textColor="text">
            {link.name}
          </SuiTypography>
        </Link>
      </SuiBox>
    ));

  return (
    <SuiBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with ❤ by
        <Link href={href} target="_blank">
          <SuiTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </SuiTypography>
        </Link>
        for a better web.
      </SuiBox>
      <SuiBox component="ul" customClass={classes.footer_list}>
        {renderLinks()}
      </SuiBox>
    </SuiBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://realback4c.herokuapp.com/", name: "Realback" },
  links: [
    { href: "https://realback4c.herokuapp.com/", name: "Realback" },
    { href: "#", name: "About Us" },
    { href: "#", name: "Blog" },
    { href: "#", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
