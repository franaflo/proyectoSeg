package com.fpmislata.banco.dominio;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpmislata.banco.common.Validaciones;
import java.util.Set;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.NotBlank;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente {

    int idCliente;

    @NotBlank
    @Pattern(regexp = "(\\d{8})([a-zA-Z]{1})")
    String dniCliente;

    @NotBlank
    @Size(min = 0, max = 50)
    String nombreCliente;

    @NotBlank
    @Size(min = 0, max = 50)
    String apellido1Cliente;

    @NotBlank
    @Size(min = 0, max = 50)
    String apellido2Cliente;

    @Size(min = 0, max = 50)
    String loginCliente;

    @Size(min = 0, max = 50)
    String passwordCliente;

    @JsonIgnore
    Set<CuentaBancaria> cuentasBancarias;
    String apiKey;

    @AssertTrue(message = "El DNI no es correcto")
    private boolean isDNIValido() {
        boolean valido;
        if (this.dniCliente != null) {
            this.dniCliente = this.dniCliente.toUpperCase();
            valido = Validaciones.comprobarDNI(this.dniCliente);
        } else {
            valido = false;
        }
        return valido;
    }

    public Cliente() {
    }

    public Cliente(int idCliente, String dniCliente, String nombreCliente, String apellido1Cliente, String apellido2Cliente, String loginCliente, String passwordCliente, String apiKey) {
        this.idCliente = idCliente;
        this.dniCliente = dniCliente;
        this.nombreCliente = nombreCliente;
        this.apellido1Cliente = apellido1Cliente;
        this.apellido2Cliente = apellido2Cliente;
        this.loginCliente = loginCliente;
        this.passwordCliente = passwordCliente;
        this.apiKey=apiKey;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getDniCliente() {
        return dniCliente;
    }

    public void setDniCliente(String dniCliente) {
        this.dniCliente = dniCliente;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellido1Cliente() {
        return apellido1Cliente;
    }

    public void setApellido1Cliente(String apellido1Cliente) {
        this.apellido1Cliente = apellido1Cliente;
    }

    public String getApellido2Cliente() {
        return apellido2Cliente;
    }

    public void setApellido2Cliente(String apellido2Cliente) {
        this.apellido2Cliente = apellido2Cliente;
    }

    public Set<CuentaBancaria> getCuentasBancarias() {
        return cuentasBancarias;
    }

    public void setCuentasBancarias(Set<CuentaBancaria> cuentasBancarias) {
        this.cuentasBancarias = cuentasBancarias;
    }

    public String getLoginCliente() {
        return loginCliente;
    }

    public void setLoginCliente(String loginCliente) {
        this.loginCliente = loginCliente;
    }

    public String getPasswordCliente() {
        return passwordCliente;
    }

    public void setPasswordCliente(String passwordCliente) {
        this.passwordCliente = passwordCliente;
    }

}
