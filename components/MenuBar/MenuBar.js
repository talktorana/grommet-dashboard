import React from 'react';
import { withRouter } from 'next/router';
import { Box, Menu, Anchor, Text } from 'grommet';
import RoutedAnchor from '../RoutedAnchor';
import routerPush from '../Router';

export default withRouter(({ items, router, ...rest }) => (
  <Box
    tag='nav'
    direction='row'
    gap='large'
    align='center'
    border='bottom'
    responsive={true}
    pad={{ horizontal: 'xlarge', vertical: 'small' }}
    {...rest}
  >
    {items.map(item => (item.items ? (
      <Menu
        key={`menu_${item.path}`}
        dropAlign={{ top: 'bottom', right: 'right' }}
        items={item.items.map(p => (
          { ...p, onClick: () => routerPush(router, p.path) }
          ))}
      >
        <Anchor
          primary={true}
          label={<Text>{item.label}</Text>}
          icon={item.icon}
        />
      </Menu>
    ) : <RoutedAnchor key={`menu_${item.path}`} primary={true} {...item} />
    ))}
  </Box>
));