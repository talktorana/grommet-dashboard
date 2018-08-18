import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Box, Heading, Select, Layer, Button } from 'grommet';
import { Menu, Grommet as GrommetIcon, Home, TextAlignCenter, CheckboxSelected, Document, Gallery, Cubes } from 'grommet-icons';
import connect from '../redux';
import RoutedButton from './RoutedButton';
import RoutedAnchor from './RoutedAnchor';
import { selectTheme } from '../redux/themes/actions';
import { navActivate } from '../redux/nav/actions';

class Header extends React.Component {
  componentDidMount() {
    this.props.navActivate(false);
  }

  onResponsiveMenu = () => {
    const { navMenu: { active } } = this.props;
    this.props.navActivate(!active);
  };

  onCloseMenu = () => {
    this.props.navActivate(false);
  };
  onThemeChange = ({ option: theme }) => {
    const { onChangeTheme } = this.props;
    console.log(this.props);
    onChangeTheme(theme);
  };

  render() {
    const {
      title: pageTitle, themes: { themes, selected: theme }, navMenu,
    } = this.props;
    const toolbarItems = [
      { path: '/', label: 'home', icon: <Home size='xsmall' /> },
      { path: '/typography', label: 'typography', icon: <TextAlignCenter size='xsmall' /> },
      { path: '/icons', label: 'icons', icon: <GrommetIcon size='xsmall' /> },
      { path: '/components', label: 'components', icon: <Cubes size='xsmall' /> },
      { path: '/pages', label: 'pages', icon: <Document size='xsmall' /> },
      { path: '/forms', label: 'forms', icon: <CheckboxSelected size='xsmall' /> },
      { path: '/gallery', label: 'gallery', icon: <Gallery size='xsmall' /> },
    ];
    const keywords = ['grommet', 'grommet 2', 'react', 'next-js', 'next.js', 'dashboard', 'npm'];
    if (pageTitle) {
      keywords.push(pageTitle);
    }
    const themeSelector = (
      <Box direction='row'>
        <Box basis='small' >
          <Select
            a11yTitle='Change theme'
            value={theme}
            options={Object.keys(themes)}
            onChange={this.onThemeChange}
          />
        </Box>
      </Box>
    );
    let menu;
    if (navMenu.responsive) {
      if (navMenu.active) {
        menu = (
          <Layer plain={true} onEsc={this.onCloseMenu} position='left' onClickOverlay={this.onCloseMenu}>
            <Box background='brand' gap='small' style={{ height: '100vh' }} pad={{ vertical: 'small' }} align='start'>
              <Button icon={<Menu />} onClick={this.onResponsiveMenu} />
              <Box pad={{ vertical: 'small', horizontal: 'medium' }} gap='small'>
                {themeSelector}
                {toolbarItems.map(item => (
                  <RoutedAnchor key={`menu_${item.path}`} primary={true} {...item} />
                ))}
              </Box>
            </Box>
          </Layer>
        );
      }
    } else {
      menu = (
        <Box direction='row' align='center' justify='end' gap='small' tag='nav'>
          {themeSelector}
        </Box>
      );
    }
    return (
      <Box background='brand'>
        <Box
          tag='header'
          direction='row-responsive'
          justify='between'
          align='center'
          border='bottom'
          pad={{ horizontal: !navMenu.responsive && 'xlarge', vertical: 'small' }}
        >
          <Box direction='row' align='center'gap='small' >
            {navMenu.responsive && (
              <Button icon={<Menu />} onClick={this.onResponsiveMenu} />
            )}
            <Heading level='3' margin='none'>
              <RoutedButton path='/'>
                  grommet dashboard
              </RoutedButton>
            </Heading>
          </Box>
          {menu}
        </Box>
        {!navMenu.responsive && (
          <Box
            tag='nav'
            direction='row'
            gap='large'
            align='center'
            border='bottom'
            responsive={true}
            pad={{ horizontal: 'xlarge', vertical: 'small' }}
          >
            {toolbarItems.map(item => (
              <RoutedAnchor key={`menu_${item.path}`} primary={true} {...item} />
            ))}
          </Box>
        )}
      </Box>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTheme, navActivate }, dispatch);

const mapStateToProps = state => ({
  themes: state.themes,
  navMenu: state.nav,
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);

