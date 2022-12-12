import {gql} from "graphql-tag";

export const PRODUCTS_QUERY = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;


export const CURRENCY_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;