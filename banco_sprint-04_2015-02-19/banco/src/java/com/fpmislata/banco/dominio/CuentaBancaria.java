package com.fpmislata.banco.dominio;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Set;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import org.hibernate.validator.constraints.NotBlank;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CuentaBancaria {

    int idCuentaBancaria;
    
    @NotBlank
    @Pattern(regexp="\\d{4}-\\d{4}-\\d{4}")
    String numeroCuentaBancaria;
    
    @NotNull
    Cliente cliente;
    
    double saldoCuentaBancaria;
    
    @NotNull
    SucursalBancaria sucursalBancaria;
    
    @JsonIgnore
    Set<MovimientoBancario> movimientosBancarios;

    public CuentaBancaria() {
    }
    
    public CuentaBancaria(int idCuentaBancaria, String numeroCuentaBancaria, int idEntidadBancaria, Cliente cliente, SucursalBancaria sucursalBancaria) {
        this.idCuentaBancaria = idCuentaBancaria;
        this.numeroCuentaBancaria = numeroCuentaBancaria;
        this.cliente = cliente;
        this.sucursalBancaria = sucursalBancaria;
    }
    
    public int getIdCuentaBancaria() {
        return idCuentaBancaria;
    }

    public void setIdCuentaBancaria(int idCuentaBancaria) {
        this.idCuentaBancaria = idCuentaBancaria;
    }

    public String getNumeroCuentaBancaria() {
        return numeroCuentaBancaria;
    }

    public void setNumeroCuentaBancaria(String numeroCuentaBancaria) {
        this.numeroCuentaBancaria = numeroCuentaBancaria;
    }

    public SucursalBancaria getSucursalBancaria() {
        return sucursalBancaria;
    }

    public void setSucursalBancaria(SucursalBancaria sucursalBancaria) {
        this.sucursalBancaria = sucursalBancaria;
    }

    public Set<MovimientoBancario> getMovimientosBancarios() {
        return movimientosBancarios;
    }

    public void setMovimientosBancarios(Set<MovimientoBancario> movimientosBancarios) {
        this.movimientosBancarios = movimientosBancarios;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public double getSaldoCuentaBancaria() {
        return saldoCuentaBancaria;
    }

    public void setSaldoCuentaBancaria(double saldoCuentaBancaria) {
        this.saldoCuentaBancaria = saldoCuentaBancaria;
    }

}
