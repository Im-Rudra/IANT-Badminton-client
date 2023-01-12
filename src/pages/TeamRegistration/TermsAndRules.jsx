import { SendOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const termsAndConditions = {
  purposes: [
    'To ensure and maintain fair and orderly administration and conduct of IANT Tournaments',
    'To uphold the good name of the IANT and the integrity of badminton. Here are the general rules and regulations. All players are advised to read all the rules and regulations before participating.'
  ],
  rules: [
    <li>
      The IANT (Islamic Association of North Texas) is open for registration Men's Singles and Men's
      Doubles
    </li>,
    <li>
      Participants in Men's Doubles will have to select their own partner (with name and Identity).
    </li>,
    <li>
      Participants in Men's Doubles are allowed to register for the Men's Singles event and vice
      versa.
    </li>,
    <li>Umpire and linesmen for every match will be appointed by the organizing committee.</li>,
    <li>
      Shuttles will be provided during the match. Change of shuttles will be at the discretion of
      the umpire.
    </li>,
    <li>
      Substitutions or changes of schedule are not allowed unless with concrete reasons (evidence or
      proof of “bona fide” injury, illness, bereavement or emergency situation) and must be approved
      by the organizing committee. The committee must be notified at least two weeks before the
      affected scheduled match.
    </li>,
    <li>
      Players are required to report to the Umpire at the venue
      <span className="font-bold">15 minutes before the scheduled match</span>
    </li>,
    <li>
      Players who do not turn up
      <span className="font-bold">10 minutes</span>
      after the scheduled time of the match will be assumed to have given a walkover to their
      opponents.
    </li>,
    <li>
      Players will be given at least a<span className="font-bold">10 minutes</span>
      rest before restarting another match.
    </li>,
    <li>
      Players will be given
      <span className="font-bold">ONLY</span>
      2-minutes warm-up time before the match.
    </li>,
    <li>
      For Double event, Partner change is not allowed unless with concrete reasons (evidence or
      proof of “bona fide” injury, illness, bereavement or other emergency situation) and must be
      approved by the organizing committee
    </li>,
    <li>A walk over considers as 21-0.</li>,
    <li>
      Each participant is required to wear proper attire per{' '}
      <a target="_blank" rel="noreferrer" href="https://i.ibb.co/SxzmZNf/IANT-Gym-rules.jpg">
        IANT Gym Rule
      </a>{' '}
      and abide by the rule. Non-compliance will result in forfeiture of participation.
    </li>,
    <li>
      Each participant needs to prepare own badminton racquet. Organizer will only prepare the court
      and shuttlecock.
    </li>,
    <li>
      <span className="font-bold">Withdrawal</span>
      from the match or tournament must be notified within
      <span className="font-bold">1 weeks</span>
      and with concrete reasons. The committee reserve the right to either find a replacement or
      disqualify the team.
    </li>,
    <li>
      All game rules and regulation that are defined by the IBF (International Badminton Federation)
      shall stand unless defined otherwise by the committee. Please refer to{' '}
      <a target="_blank" rel="noreferrer" href="https://www.worldbadminton.com/rules/">
        International Badminton's rules
      </a>{' '}
      for more details.
    </li>,
    <li>
      The committee will not be responsible for any injuries or medical problems arise during the
      tournament, however a basic first aid kid will be provided.
    </li>,
    <li>
      The committee will reserve all the right to change, amend, add any provision and decision on
      tournament format and administration.
    </li>
  ]
};

const TermsAndRules = ({ setAccept }) => {
  const [checked, setChecked] = useState(false);

  const onChange = () => setChecked((prev) => !prev);
  return (
    <div style={{ opacity: 60 }} className="container flex justify-center items-center">
      <Card
        title="Terms & Conditions"
        bordered={false}
        style={{
          maxWidth: 800
        }}
        bodyStyle={{
          height: 'calc(100vh - 170px)',
          overflowY: 'auto'
        }}
      >
        <h2 className="text-lg font-bold">PURPOSES:</h2>
        <ul className="ml-3">
          {termsAndConditions.purposes.map((term, i) => (
            <div key={'purpose-' + (i + 1)} className="mt-2 list-disc">
              {term}
            </div>
          ))}
        </ul>
        <p className="my-3">
          Here are the general rules and regulations. All players are advised to read all the rules
          and regulations before participating.
        </p>
        <h2 className="text-lg font-bold">Rules & Regulations:</h2>
        <ul className="ml-3">
          {termsAndConditions.rules.map((rule, i) => (
            <div key={'rule-' + (i + 1)} className="mt-2 list-disc">
              {rule}
            </div>
          ))}
        </ul>
        <p className="mt-6 mb-2">
          <Checkbox checked={checked} onChange={onChange}>
            <span className="font-bold text-base">
              <span className="text-red-600">*</span>Accept our terms and conditions
            </span>
          </Checkbox>
        </p>
        <Button
          onClick={() => setAccept(true)}
          icon={<SendOutlined />}
          type="primary"
          disabled={!checked}
        >
          Next
        </Button>
      </Card>
    </div>
  );
};

export default TermsAndRules;
