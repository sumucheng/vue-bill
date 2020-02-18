import billStore from './billStore'
import budgetStore from './budgetStore'
export default {
    ...billStore,
    ...budgetStore
}
