import tagStore from './tagStore'
import billStore from './billStore'
import budgetStore from './budgetStore'
export default {
    ...tagStore,
    ...billStore,
    ...budgetStore
}
