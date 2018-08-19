import React from 'react';
import { Box, Button } from 'grommet';
import { Form } from 'grommet-controls';
import CenterLayout from './CenterLayout';
import { Card, CardTitle, CardActions, CardContent } from '../Card';

export default ({
  pageTitle, basis = 'medium', title, children, footer, actions, submit,
}) => (
  <CenterLayout
    title={pageTitle}
  >
    <Box basis={basis} gap='large'>
      <Card>
        <CardTitle pad='medium'>
          {title}
        </CardTitle>
        <Form onSubmit={(e) => { alert(JSON.stringify(e)); }} basis='full'>
          <CardContent gap='small' pad={{ horizontal: 'medium', top: 'medium', bottom: 'large' }} >
            {children}
          </CardContent>
          <CardActions pad='medium' alignContent='stretch'>
            {actions || <Button hoverIndicator='background' primary={true} type='submit' label={submit} />}
          </CardActions>
        </Form>
      </Card>
      <Box direction='row' alignSelf='center' gap='small' align='center'>
        {footer}
      </Box>
    </Box>
  </CenterLayout>
);
