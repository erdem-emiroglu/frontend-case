import Chip from './index'

describe('<Chip />', () => {
    it('renders', () => {
        cy.mount(<Chip/>)
    });

    it('renders with a text', () => {
        cy.mount(<Chip text="Chip"/>)
        cy.contains('Chip')
    });

    it('calls onDelete', () => {
        const onDeleteSpy = cy.spy().as('onDeleteSpy');
        cy.mount(<Chip text="Chip" onDelete={onDeleteSpy}/>)
        cy.get('[data-cy=delete-chip]').click()
        cy.get('@onDeleteSpy').should('have.been.called')
    });

    it('calls with a delete button', () => {
        const onDeleteSpy = cy.spy().as('onDeleteSpy');
        cy.mount(<Chip text="Chip" onDelete={onDeleteSpy}/>)
        cy.get('[data-cy=delete-chip]').should('exist')
    });

    it('renders without a delete button', () => {
        cy.mount(<Chip text="Chip"/>)
        cy.get('[data-cy=delete-chip]').should('not.exist')
    });
})
