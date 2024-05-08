import Select from '@/components/Select/base';

describe('<Select />', () => {
  it('renders', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    cy.mount(<Select options={[]} accessor="" onChange={onSelectSpy} />);
  });

  it('renders with a label', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    cy.mount(<Select options={[]} accessor="" onChange={onSelectSpy} />);
    cy.get('[data-cy=select]').should('exist');
  });

  it('renders with a value', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    const options = [{ id: 1, name: 'test' }];
    cy.mount(<Select options={options} accessor="name" onChange={onSelectSpy} value={options[0]} />);
    cy.contains('test');
  });

  it('renders with a chip', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    const options = [{ id: 1, name: 'test' }];
    cy.mount(<Select multiple={true} options={options} accessor="name" onChange={onSelectSpy} value={options} />);
    cy.get('[data-cy=chip]').should('exist');
  });

  it('renders with a search', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    cy.mount(<Select options={[]} accessor="" onChange={onSelectSpy} onSearch={() => {}} />);
    cy.get('[data-cy=search]').should('exist');
  });

  it('calls onSelect', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    const options = [{ id: 1, name: 'test' }];
    cy.mount(<Select options={options} accessor="name" onChange={onSelectSpy} />);
    cy.get('[data-cy=select]').click();
    cy.get('[data-cy=options]').children().first().click();
    cy.get('@onSelectSpy').should('have.been.calledWith', options[0]);
  });

  it('calls onSelect with multiple', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    const options = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
    ];
    cy.mount(<Select multiple={true} value={[]} options={options} accessor="name" onChange={onSelectSpy} />);
    cy.get('[data-cy=select]').click();
    cy.get('[data-cy=options]').children().first().click();
    cy.get('@onSelectSpy').should('have.been.calledWith', [options[0]]);
  });

  it('renders with loading', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    cy.mount(<Select options={[]} accessor="" onChange={onSelectSpy} loading={true} />);
    cy.get('[data-cy=loader]').should('exist');
  });

  it('renders with error', () => {
    const onSelectSpy = cy.spy().as('onSelectSpy');
    cy.mount(<Select options={[]} accessor="" onChange={onSelectSpy} error="Something went wrong" />);
    cy.contains('Something went wrong');
  });
});
