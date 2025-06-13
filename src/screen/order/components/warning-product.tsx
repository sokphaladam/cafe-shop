/* eslint-disable @next/next/no-img-element */
import { Sku } from '@/gql/graphql';
import { Button, Icon, Modal } from '@shopify/polaris';
import { AlertCircleIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

interface Props {
  sku?: Sku | null;
}

export function WarningProduct(props: Props) {
  const [open, setOpen] = useState(true);

  const activator = (
    <div
      onClick={() => setOpen(true)}
      className="bg-rose-300 shadow-md motion-safe:animate-bounce fixed bottom-4 right-4 rounded-full w-10 h-10 flex flex-row justify-center items-center text-lg cursor-pointer z-50"
    >
      <Icon source={AlertCircleIcon} tone="critical" />
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="គោលការណ៍ឯកជនភាព"
      activator={activator}
      footer={
        <Button tone="critical" variant="primary" fullWidth onClick={() => setOpen(false)}>
          Close
        </Button>
      }
    >
      {props.sku && (
        <Modal.Section>
          <img src={props.sku.image || ''} alt="" className="w-full object-contain aspect-square" />
          <div className="space-y-4 mt-4">
            <p className="text-lg font-bold">គោលការណ៍ឯកជនភាព</p>
            <p>
              ដើម្បីរក្សាបាននូវបទពិសោធន៍សេវាកម្មជាប់លាប់ និងរក្សាបាននូវស្តង់ដាររបស់យើង
              ភ្ញៀវដែលនាំយកស្រាផ្ទាល់ខ្លួនមកក្នុងគ្រឹះស្ថានរបស់យើង នឹងត្រូវបង់ថ្លៃ {props.sku.price} ដុល្លារក្នុងមួយដប។
            </p>
            <p>
              គោលការណ៍នេះជួយយើងក្នុងការរ៉ាប់រងថ្លៃដើមនៃគ្រឿងកញ្ចក់ សេវាកម្ម និងការសម្អាត។ យើងសូមកោតសរសើរចំពោះការយោគយល់
              និងកិច្ចសហប្រតិបត្តិការរបស់អ្នក។
            </p>
            <p className="text-lg font-bold">Privacy Policy</p>
            <p>
              To maintain a consistent service experience and uphold our standards, guests who bring their own wine into
              our establishment will be subject to a corkage fee of ${props.sku.price} per bottle.
            </p>
            <p>
              This policy helps us cover the cost of glassware, service, and cleanup. We appreciate your understanding
              and cooperation.
            </p>
          </div>
        </Modal.Section>
      )}
    </Modal>
  );
}
