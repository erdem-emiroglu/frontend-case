import NoData from '@/components/NoData';

describe('<NoData />', () => {
  it('renders', () => {
    cy.mount(<NoData />);
  });

  it('renders with a text', () => {
    cy.mount(<NoData text="No data found" />);
    cy.contains('No data found');
  });
});
