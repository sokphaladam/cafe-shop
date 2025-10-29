/* eslint-disable @next/next/no-img-element */
import { Sku } from '@/gql/graphql';
import { Button, Icon, Modal, Text, BlockStack, InlineStack, Divider, Badge } from '@shopify/polaris';
import { AlertCircleIcon, InfoIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

interface Props {
  sku?: Sku | null;
}

export function WarningProduct(props: Props) {
  const [open, setOpen] = useState(true);

  const activator = (
    <div
      onClick={() => setOpen(true)}
      className="bg-gradient-to-br from-rose-400 to-rose-500 shadow-lg hover:shadow-xl transition-all duration-300 motion-safe:animate-bounce fixed bottom-6 right-6 rounded-full w-14 h-14 flex flex-row justify-center items-center text-lg cursor-pointer z-50 hover:scale-110 border-0"
      role="button"
      aria-label="View important policy information"
      title="Important Policy - Click to view"
    >
      <AlertCircleIcon className="w-6 h-6 fill-slate-200" />
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={
        <InlineStack gap="200" align="start" blockAlign="center">
          <Icon source={InfoIcon} tone="info" />
          <span>Important Policy Information</span>
        </InlineStack>
      }
      activator={activator}
      footer={
        <div className="flex gap-2 w-full">
          <Button tone="critical" variant="primary" size="large" fullWidth onClick={() => setOpen(false)}>
            I Understand
          </Button>
        </div>
      }
      instant
    >
      {props.sku && (
        <Modal.Section>
          <BlockStack gap="400">
            {/* Product Image Section */}
            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
              <img
                src={props.sku.image || ''}
                alt={props.sku.name || 'Product'}
                className="w-full object-contain aspect-square"
              />
            </div>

            {/* Khmer Section */}
            <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
              <BlockStack gap="300">
                <div className="flex items-center gap-2">
                  <Text as="h2" variant="headingLg" fontWeight="bold">
                    📋 គោលការណ៍ឯកជនភាព
                  </Text>
                  <Badge tone="info">ភាសាខ្មែរ</Badge>
                </div>

                <Divider />

                <div className="bg-white rounded-md p-4 border border-blue-200">
                  <Text as="p" variant="bodyLg" tone="subdued">
                    ដើម្បីរក្សាបាននូវបទពិសោធន៍សេវាកម្មជាប់លាប់ និងរក្សាបាននូវស្តង់ដាររបស់យើង
                    ភ្ញៀវដែលនាំយកស្រាផ្ទាល់ខ្លួនមកក្នុងគ្រឹះស្ថានរបស់យើង នឹងត្រូវបង់ថ្លៃ
                  </Text>
                  <div className="mt-3 inline-flex items-center bg-rose-100 border-2 border-rose-400 rounded-lg px-4 py-2">
                    <Text as="span" variant="headingMd" fontWeight="bold" tone="critical">
                      {props.sku.price} ដុល្លារ
                    </Text>
                    <Text as="span" variant="bodyMd" tone="subdued" fontWeight="medium">
                      &nbsp;/ ក្នុងមួយដប
                    </Text>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-md p-4 border border-amber-200">
                  <Text as="p" variant="bodyMd" tone="subdued">
                    💡 គោលការណ៍នេះជួយយើងក្នុងការរ៉ាប់រងថ្លៃដើមនៃគ្រឿងកញ្ចក់ សេវាកម្ម និងការសម្អាត។
                    យើងសូមកោតសរសើរចំពោះការយោគយល់ និងកិច្ចសហប្រតិបត្តិការរបស់អ្នក។
                  </Text>
                </div>
              </BlockStack>
            </div>

            {/* English Section */}
            <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
              <BlockStack gap="300">
                <div className="flex items-center gap-2">
                  <Text as="h2" variant="headingLg" fontWeight="bold">
                    📋 Privacy Policy
                  </Text>
                  <Badge tone="success">English</Badge>
                </div>

                <Divider />

                <div className="bg-white rounded-md p-4 border border-green-200">
                  <Text as="p" variant="bodyLg" tone="subdued">
                    To maintain a consistent service experience and uphold our standards, guests who bring their own
                    wine into our establishment will be subject to a corkage fee of
                  </Text>
                  <div className="mt-3 inline-flex items-center bg-rose-100 border-2 border-rose-400 rounded-lg px-4 py-2">
                    <Text as="span" variant="headingMd" fontWeight="bold" tone="critical">
                      ${props.sku.price}
                    </Text>
                    <Text as="span" variant="bodyMd" tone="subdued" fontWeight="medium">
                      &nbsp;per bottle
                    </Text>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-md p-4 border border-amber-200">
                  <Text as="p" variant="bodyMd" tone="subdued">
                    💡 This policy helps us cover the cost of glassware, service, and cleanup. We appreciate your
                    understanding and cooperation.
                  </Text>
                </div>
              </BlockStack>
            </div>

            {/* Thank You Message */}
            <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <Text as="p" variant="bodyLg" fontWeight="semibold" tone="magic">
                🙏 Thank you for your cooperation | សូមអរគុណ
              </Text>
            </div>
          </BlockStack>
        </Modal.Section>
      )}
    </Modal>
  );
}
