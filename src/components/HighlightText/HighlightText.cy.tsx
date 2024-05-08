import HighlightText from '@/components/HighlightText';

describe('<HighlightText />', () => {
  it('renders', () => {
    cy.mount(<HighlightText text="HighlightText" highlight="Highlight" />);
  });

  it('renders with a highlighted text', () => {
    cy.mount(<HighlightText text="HighlightText" highlight="Highlight" />);
    cy.get('[data-cy=highlighted]').should('exist');
  });

  it('renders with a not highlighted text', () => {
    cy.mount(<HighlightText text="HighlightText" highlight="not exist" />);
    cy.get('[data-cy=highlighted]').should('not.exist');
  });
});
