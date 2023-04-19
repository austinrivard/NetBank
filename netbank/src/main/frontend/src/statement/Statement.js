import React from 'react';
import './statement.css';

function Text(props) {
  return <span>{props.value}</span>;
}

function Statement(props) {
  return (
    <div className="Statement">
      <Text value={`Statement for ${props.statement.month} ${props.statement.year}`} />
      <Text className="bold" value={`Account Balance: $${props.statement.balance}`} />
      <Text className="credit" value={`Total Credits: $${props.statement.credits}`} />
      <Text className="debit" value={`Total Debits: $${props.statement.debits}`} />
    </div>
  );
}

function StatementList(props) {
  return (
    <div className="StatementList">
      {props.statements.map((statement) => (
        <Statement key={statement.id} statement={statement} />
      ))}
    </div>
  );
}

function Statements(props) {
  const statements = [
    { id: 1, month: 'January', year: 2023, balance: 5000, credits: 3000, debits: 2000 },
    { id: 2, month: 'February', year: 2023, balance: 6000, credits: 4000, debits: 2000 },
    { id: 3, month: 'March', year: 2023, balance: 7000, credits: 5000, debits: 2000 },
  ];

  return (
    <div className="Statements">
      <Text value="Statements" />
      <StatementList statements={statements} />
    </div>
  );
}

export default Statements;
