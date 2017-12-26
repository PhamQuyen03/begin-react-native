/**
 * @providesModule WeFit.Redux.Actions.ServiceApi.Feeds
 */

import { createAction } from 'redux-actions';
// import { Logger } from '@onaclover/react-native-utils';

// Models
// Constants
import { SERVICE_API } from '../../type';

export function getArticleCategories(type) {
  const action = createAction(SERVICE_API.GET_CATEGORIES_CONTENT);
  const dataKey = 'articleCategories';
  return (dispatch, getState) => {
    const request = {
      headers: {
        // Authorization: 'Bearer ',
        Accept: 'application/json; version=v1',
      },
      transformResponse: ({ result }) => result,
      url: `/terms/${type}`,
    };

    dispatch(action({ dataKey, request }));
  };
}
export const getDataSessionSuccess = () => ({
  type: SERVICE_API.GET_CATEGORIES_CONTENT,
  payload: {
    request: {
      url: '/terms/full-size-articles',
    },
    response: {
      // response object from axios
    },
  
  },
});
