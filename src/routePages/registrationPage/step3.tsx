import CustomButton from "@/components/button/customButton";
import RadioButton from "@/components/button/radioButton";
import FormLayout from "@/components/form/formLayout";
import JsonForm from "@/components/form/jsonForm";
import CustomImage from "@/components/image/customImage";
import { IconJson } from "@/images/imagesFile";

import React, { useEffect, useMemo, useState } from "react";
import { orderReportJson, scoutingSubscriptionJson } from "./formJson";
import CombineFormLayout from "@/components/form/combineFormLayout";
type StepThreeType = {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  subscriptionResData?: string[];
  setSubscriptionResData?: (value: object) => void;
  isEdit?: boolean;
};
// Define the type for the individual report
interface Report {
  price: string;
  features: string[];
  isSelected: boolean;
  type: string;
  borderColor?: string;
  selectedColor?: string;
  priceValue?: number;
  // isselected: boolean;
}

// Define the type for subscription types
interface SubscriptionType {
  isselected: boolean;
}

// Define the type for the overall orderReportJson object
interface OrderReportJson {
  [key: string]: Report | { [key: string]: SubscriptionType };
}
const StepThree = (props: StepThreeType) => {
  const {
    children,
    onClick,
    subscriptionResData = [],
    setSubscriptionResData = () => { },
    isEdit = false,
  } = props;

  const [subscriptionData, setSubscriptionData] = useState<OrderReportJson>({
    ...orderReportJson,
  });

  const [scoutingSubscription, setScoutingSubscription] =
    useState<OrderReportJson>({
      ...scoutingSubscriptionJson,
    });

  useEffect(() => {
    // set api data
    if (subscriptionResData?.length) {
      subscriptionResData?.map((item: any) => {
        let subName: string = item?.scriptionName;
        if (subName && subscriptionData[subName]) {
          subscriptionData[subName] = {
            ...subscriptionData[subName],
            ...item,
          };
        }
        if (subName && scoutingSubscription[subName]) {
          scoutingSubscription[subName] = {
            ...scoutingSubscription[subName],
            ...item,
          };
        }
      });
      setSubscriptionData({ ...subscriptionData });
      setScoutingSubscription({ ...scoutingSubscription });
    }
  }, [subscriptionResData]);

  useEffect(() => {
    setSubscriptionResData({
      ...(subscriptionData || {}),
      ...(scoutingSubscription || {}),
    });
  }, [subscriptionData, scoutingSubscription]);

  const setSubscriptionDataFun = (selectedKey: string) => {
    Object.entries(subscriptionData || {})?.map(([key, value]) => {
      if (key !== "Subscription type") {
        if (key == selectedKey) {
          subscriptionData[selectedKey].isSelected =
            !subscriptionData[selectedKey].isSelected;
        } else {
          subscriptionData[key].isSelected = false;
        }
      }
    });

    setSubscriptionData({ ...subscriptionData });
  };
  const finalTotalPrice = useMemo(() => {
    let total = 0;
    Object.entries(subscriptionData).forEach(([key, value]) => {
      if (value.priceValue && value.isSelected) {
        total += Number(value.priceValue);
      }
    });
    return total;
  }, [subscriptionData]);

  const setScoutingFun = (selectedKey: string) => {
    scoutingSubscription[selectedKey].isSelected =
      !scoutingSubscription[selectedKey].isSelected;
    setScoutingSubscription({ ...scoutingSubscription });
  };
  const scoutfinalTotalPrice = useMemo(() => {
    let total = 0;
    Object.entries(scoutingSubscription).forEach(([key, value]) => {
      if (value.priceValue && value.isSelected) {
        total += Number(value.priceValue);
      }
    });
    return total;
  }, [scoutingSubscription]);

  return !isEdit ? (
    <div className="flex flex-col items-center gap-4">
      <JsonForm onClick={onClick} formJson={{}}>
        <FormLayout className=" w-full sm:w-[460px] h-[400px]">
          {Object.entries(scoutingSubscription || {})?.map(
            ([objKey, values]: any) => {
              return (
                values?._id && (
                  <ReportCard
                    title={objKey}
                    price={`${values.price} ${values.type}`}
                    borderColor={
                      !values.isSelected
                        ? values?.borderColor
                        : values.selectedColor
                    }
                    description={values.features}
                    onClick={() => setScoutingFun(objKey)}
                    isSelected={values?.isSelected}
                  />
                )
              );
            }
          )}
          <div className="w-full">
            <Total
              amount={`${scoutfinalTotalPrice ? scoutfinalTotalPrice - 35 : 0
                }€ / an`}
            />
            <SubscribeButton />
          </div>
        </FormLayout>
        <div className="mt-10">
          <FormHeader title="Order reports" className="mb-5" />
          <FormLayout className="w-full sm:w-[440px] h-auto">
            {Object.entries(subscriptionData || {})?.map(
              ([objKey, values]: any) => {
                return (
                  values?._id && (
                    <ReportCard
                      title={objKey}
                      price={`${values.price} ${values.type}`}
                      borderColor={
                        !values.isSelected
                          ? values?.borderColor
                          : values.selectedColor
                      }
                      description={values.features}
                      onClick={() => setSubscriptionDataFun(objKey)}
                      isSelected={values?.isSelected}
                    />
                  )
                );
              }
            )}
            <div className=" h-max sm:h-[74px] flex flex-col justify-start items-start">
              <SectionTitle title="Subscription type" />
              <SubscriptionOptions
                subscriptionData={subscriptionData}
                setSubscriptionData={setSubscriptionData}
              />
            </div>
            <div className="mt-10 w-full">
              <Total amount={`${finalTotalPrice}€ / an`} />
              <SubscribeButton />
            </div>
          </FormLayout>
        </div>

        {children}
      </JsonForm>
    </div>
  ) : (
    <div>
      <CombineFormLayout>
        <div>
          <div className="text-light-gray text-[32px] font-bold leading-10 w-full py-4">
            Create reports
          </div>
          <FormLayout className="w-full sm:w-[460px] h-[400px]">
            {Object.entries(scoutingSubscription || {})?.map(
              ([objKey, values]: any) => {
                return (
                  values?._id && (
                    <ReportCard
                      title={objKey}
                      price={`${values.price} ${values.type}`}
                      borderColor={
                        !values.isSelected
                          ? values?.borderColor
                          : values.selectedColor
                      }
                      description={values.features}
                      onClick={() => setScoutingFun(objKey)}
                      isSelected={values?.isSelected}
                    />
                  )
                );
              }
            )}
            <div className="w-full">
              <Total
                amount={`${scoutfinalTotalPrice ? scoutfinalTotalPrice - 35 : 0
                  }€ / an`}
              />
              <SubscribeButton />
            </div>
          </FormLayout>
        </div>

        <div>
          <div className="text-light-gray text-[32px] font-bold leading-10 w-full py-4">
            Order reports
          </div>
          <FormLayout className=" w-full sm:w-[440px] h-auto">
            {Object.entries(subscriptionData || {})?.map(
              ([objKey, values]: any) => {
                return (
                  values?._id && (
                    <ReportCard
                      title={objKey}
                      price={`${values.price} ${values.type}`}
                      borderColor={
                        !values.isSelected
                          ? values?.borderColor
                          : values.selectedColor
                      }
                      description={values.features}
                      onClick={() => setSubscriptionDataFun(objKey)}
                      isSelected={values?.isSelected}
                    />
                  )
                );
              }
            )}
            <div className="h-max sm:h-[74px] w-full sm:w-max flex flex-col justify-start items-start">
              <SectionTitle title="Subscription type" />
              <SubscriptionOptions
                subscriptionData={subscriptionData}
                setSubscriptionData={setSubscriptionData}
              />
            </div>
            <div className="mt-10 w-full">
              <Total amount={`${finalTotalPrice}€ / an`} />
              <SubscribeButton />
            </div>
          </FormLayout>
        </div>
      </CombineFormLayout>
    </div>
  );
};

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <div className="flex flex-col items-start gap-1 mt-8 mb-4 ">
    <h2 className="text-light-gray text-base font-semibold leading-snug text-[16px]">
      {title}
    </h2>
  </div>
);
interface SubscriptionOptionProps {
  color: string;
  borderColor: string;
  label: string;
  isActive: boolean;
}

export const SubscriptionOption: React.FC<SubscriptionOptionProps> = ({
  color,
  borderColor,
  label,
  isActive,
}) => (
  <div
    className={`grow shrink basis-0 h-12 px-4 py-3 rounded border-2 flex items-center gap-3 cursor-pointer  ${isActive ? "bg-[#1f1f37]" : "bg-deep-purple"
      }`}
    style={{ borderColor }}
  >
    <RadioButton isActive={isActive} />
    <CustomButton
      name={""}
      parentClassName="grow shrink basis-0 h-6 flex items-center gap-2"
    >
      <div className="text-light-gray text-lg font-bold leading-normal">
        {label}
      </div>
    </CustomButton>

    <div className="grow shrink basis-0 h-6 flex items-center gap-2"></div>
  </div>
);

type SubscriptionOptionsType = {
  subscriptionData: any;
  setSubscriptionData?: (value: OrderReportJson) => void;
};
export const SubscriptionOptions = (props: SubscriptionOptionsType) => {
  const { subscriptionData, setSubscriptionData = () => { } } = props;

  const setSubscriptionDataBtnFun: any = (objectKey: string) => {
    Object.entries(subscriptionData?.["Subscription type"] || {})?.map(
      ([objectKey]) => {
        subscriptionData["Subscription type"][objectKey].isselected = false;
      }
    );
    if (subscriptionData["Subscription type"][objectKey]) {
      subscriptionData["Subscription type"][objectKey].isselected = true;
      setSubscriptionData({ ...subscriptionData });
    }
  };
  return (
    <div className="self-stretch flex flex-col sm:flex-row gap-2">
      {Object.entries(subscriptionData?.["Subscription type"] || {})?.map(
        ([objectKey, objectValue]: any) => {
          return (
            <div onClick={() => setSubscriptionDataBtnFun(objectKey)}>
              <SubscriptionOption
                color="#edecf4"
                borderColor="#52528e"
                label={objectKey}
                isActive={objectValue?.isselected}
              />
            </div>
          );
        }
      )}
    </div>
  );
};
export const FormHeader = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => (
  <div className={`h-10 flex items-center ${className}`}>
    <h1 className="text-light-gray text-2xl font-bold leading-10">{title}</h1>
  </div>
);

const Card = ({
  title,
  subtitle,
  price,
}: {
  title: string;
  subtitle: string;
  price: string;
}) => (
  <div className="h-[124px] px-2.5 rounded border border-[#ababce]/25 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-3.5 h-3.5 bg-white rounded-full border-4 border-slate-blue" />
      <div className="flex flex-col">
        <h3 className="text-white text-base font-semibold">{title}</h3>
        <p className="text-[#aaaace] text-xs">{subtitle}</p>
      </div>
    </div>
    <div className="text-white text-base font-semibold">{price}</div>
  </div>
);

export const Total = ({ amount }: { amount: string }) => (
  <div className="h-[92px] flex flex-col gap-2 mt-4">
    <div className="w-full sm:w-[400px] text-light-gray text-base font-semibold">
      Total
    </div>
    <div className=" w-full sm:w-[400px] h-[62px] px-2 py-4 bg-deep-purple flex items-center justify-center">
      <div className="text-center text-light-gray text-2xl font-bold">
        {amount}
      </div>
    </div>
  </div>
);

export const SubscribeButton = () => (
  <CustomButton
    name="Subscribe"
    className="pl-4 pr-3 py-2 bg-gradient-to-r from-[#e30e7a] via-[#f971ba] to-[#f740a2] rounded-sm flex items-center gap-1.5 "
    parentClassName="flex justify-center mt-10"
  >
    <CustomImage src={IconJson.checkIcon} height={20} width={20} />

    <div className="w-4 h-4 flex items-center justify-center"></div>
  </CustomButton>
);

interface ReportCardProps {
  title: string;
  description: string[];
  price: string;
  color?: string;
  borderColor?: string;
  onClick?: (value: any) => void;
  isSelected?: boolean | undefined;
}
export const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description = [],
  price,
  borderColor = "#ababce",
  onClick = () => { },
  isSelected = false,
}) => (
  <div
    className="h-[107px] px-2.5 rounded border w-full mt-4 cursor-pointer"
    style={{ borderColor }}
    onClick={onClick}
  >
    <div className="flex justify-between items-center h-full">
      <div className="flex items-center gap-3">
        <RadioButton isActive={isSelected} />

        <div className="flex flex-col">
          <h3 className="text-[#f73fa1] text-base font-semibold">{title}</h3>
          <ul className="list-disc list-inside space-y-1">
            {description?.map((line, index) => (
              <li key={index} className="text-[#aaaace] text-xs font-normal">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-right text-white text-base font-semibold min-w-[116px]">
        {price}
      </div>
    </div>
  </div>
);

export default StepThree;
