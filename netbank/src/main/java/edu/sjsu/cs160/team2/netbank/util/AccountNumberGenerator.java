package edu.sjsu.cs160.team2.netbank.util;

import java.io.Serializable;
import java.util.Random;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class AccountNumberGenerator implements IdentifierGenerator {
    // Generates a random string of 9 characters
    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        Random rand = new Random();
        return rand.ints(0, 10)
            .limit(9)
            .mapToObj(i -> (char)('0' + i))
            .collect(StringBuffer::new, StringBuffer::append, StringBuffer::append)
            .toString();
    }
}
