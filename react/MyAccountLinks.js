import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

const MyAccountLinks = ({ render }) => {
  return render([
    {
      name: 'Dados de Cadastro',
      path: '/my-profile',
    }
  ])
}

MyAccountLinks.propTypes = {
    render: PropTypes.func.isRequired,
}

export default injectIntl(MyAccountLinks)