import Loader from '@/components/Loader';

describe('<Loader />', () => {
  it('renders', () => {
    cy.mount(<Loader />);
  });

  it('renders with a text', () => {
    cy.mount(<Loader text="Loading..." />);
    cy.contains('Loading...');
  });

  it('renders with md size', () => {
    cy.mount(<Loader size="md" />);
    cy.get('[data-cy=loader]').should('satisfy', ($el: HTMLElement[]) => {
      const classList = $el[0].classList;
      return classList[0].includes('loader--md');
    });
  });

  it('renders with spinner', () => {
    cy.mount(<Loader withSpinner={true} />);
    cy.get('[data-cy=loader]').children('[data-cy=spinner]').should('exist');
  });

  it('renders without spinner', () => {
    cy.mount(<Loader withSpinner={false} />);
    cy.get('[data-cy=loader]').children('[data-cy=spinner]').should('not.exist');
  });
});
