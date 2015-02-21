package com.fpmislata.banco.persistencia.dao.impl.hibernate;

import com.fpmislata.banco.dominio.CuentaBancaria;
import com.fpmislata.banco.dominio.MovimientoBancario;
import com.fpmislata.banco.dominio.TipoMovimiento;
import com.fpmislata.banco.persistencia.dao.MovimientoBancarioDAO;
import com.fpmislata.banco.persistencia.dao.BussinessException;
import com.fpmislata.banco.persistencia.dao.impl.hibernate.common.GenericDAOImplHibernate;
import static com.fpmislata.banco.persistencia.dao.impl.hibernate.common.GenericDAOImplHibernate.LOGGER;
import com.fpmislata.banco.persistencia.dao.impl.hibernate.common.HibernateUtil;
import java.util.logging.Level;
import org.hibernate.Session;

public class MovimientoBancarioDAOImplHibernate extends GenericDAOImplHibernate<MovimientoBancario> implements MovimientoBancarioDAO {

    @Override
    public MovimientoBancario insert(MovimientoBancario movimientoBancario) throws BussinessException {
        Session session = HibernateUtil.getSessionFactory().getCurrentSession();
        try {
            session.beginTransaction();
            CuentaBancaria cuentaBancaria = movimientoBancario.getCuentaBancaria();

            if (movimientoBancario.getTipoMovimiento().equals(TipoMovimiento.HABER)) {
                cuentaBancaria.setSaldoCuentaBancaria(cuentaBancaria.getSaldoCuentaBancaria() + movimientoBancario.getCantidadMovimientoBancario());
            } else {
                if (cuentaBancaria.getSaldoCuentaBancaria() >= movimientoBancario.getCantidadMovimientoBancario()) {
                    cuentaBancaria.setSaldoCuentaBancaria(cuentaBancaria.getSaldoCuentaBancaria() - movimientoBancario.getCantidadMovimientoBancario());
                } else {
                    throw new BussinessException("SaldoCuenta", "El saldo de la cuenta es insuficiente");
                }
            }
                session.save(movimientoBancario);
                session.getTransaction().commit();

                return movimientoBancario;
            

        } catch (javax.validation.ConstraintViolationException cve) {
            try {
                if (session.getTransaction().isActive()) {
                    session.getTransaction().rollback();
                }
            } catch (Exception exc) {
                LOGGER.log(Level.WARNING, "Error al hacer rollback", exc);
            }
            throw new BussinessException(cve);

        }
    }

}
