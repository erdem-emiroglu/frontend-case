import Search from './index'

describe('<Search />', () => {
    it('renders', () => {
        const onSearchSpy = cy.spy().as('onSearchSpy')
        cy.mount(<Search onSearch={onSearchSpy}/>)
    })

    it('renders with a border', () => {
        const onSearchSpy = cy.spy().as('onSearchSpy')
        cy.mount(<Search onSearch={onSearchSpy} withBorder={true}/>)
        cy.get('[data-cy=search]').should('not.have.css', 'border', 'none')
    })

    it('renders without a border', () => {
        const onSearchSpy = cy.spy().as('onSearchSpy')
        cy.mount(<Search onSearch={onSearchSpy} withBorder={false}/>)
        cy.get('[data-cy=search]').should('have.css', 'border', '0px none rgb(0, 0, 0)')
    })

    it('calls onSearch', () => {
        const onSearchSpy = cy.spy().as('onSearchSpy')
        cy.mount(<Search onSearch={onSearchSpy}/>)
        cy.get('[data-cy=search]').type('test')
        cy.get('@onSearchSpy').should('have.been.calledWith', 'test')
    })
})
