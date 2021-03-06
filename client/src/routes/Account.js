import React from 'react';
import { css } from 'emotion';
import { connect } from 'unistore/react';
import { Header, Icon, Item, Grid, Divider } from 'semantic-ui-react';
import HeaderBar from '../components/HeaderBar';
import authActions from '../actions/auth';
import searchItemActions from '../actions/searchItem';
import combineActions from '../actions/combineActions';
import saleItemActions from '../actions/saleItem';
import SavedSearches from '../components/account/SavedSearches';
import SaleCard from '../components/SaleCard';

class Account extends React.Component {
  componentDidMount() {
    this.props.getSavedSearchItems();
  }

  render() {
    const {
      userPhoto,
      userEmail,
      user,
      savedSearchItems,
      addSavedSearchItem,
      removeSavedSearchItem,
      addSavedSaleItem,
      recItems
    } = this.props;

    const recItemCards =
      recItems != null ? (
        recItems.map(element => (
          <SaleCard
            productName={element.productName}
            endDate={element.endDate}
            image={element.image}
            salePrice={element.salePrice}
            storeName={element.storeName}
            best={false}
            addSavedSaleItem={() => addSavedSaleItem({ id: element.id })}
            isSignedIn
          />
        ))
      ) : (
        <div />
      );

    return (
      <div
        className={css`
          margin-top: 10px;
        `}
      >
        <HeaderBar />
        <Header as="h2" align="center">
          <Header.Content>
            Account Overview
            <Header.Subheader>Manage your searches</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Grid columns={2}>
          <Grid.Column largeScreen={4} mobile={16} widescreen={4}>
            <Header as="h3" align="left">
              <Icon name="user" />
              User Information
            </Header>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" src={userPhoto} inline centered />
                <Item.Content>
                  <Item.Header as="h2">{user}</Item.Header>
                  <Item.Meta>Email: {userEmail}</Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
            <SavedSearches
              savedSearchItems={savedSearchItems}
              addSavedSearchItem={data => addSavedSearchItem(data)}
              removeSavedSearchItem={data => removeSavedSearchItem(data)}
            />
          </Grid.Column>
          <Grid.Column largeScreen={12} mobile={16} widescreen={12}>
            <Header as="h3" align="center">
              <Icon name="star" />
              Recommended Items
            </Header>
            <br />
            <Grid centered>{recItemCards}</Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const allActions = combineActions(
  authActions,
  searchItemActions,
  saleItemActions
);
export default connect(
  ['user', 'userPhoto', 'userEmail', 'savedSearchItems', 'recItems'],
  allActions
)(Account);
