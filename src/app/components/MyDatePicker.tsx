import React, { useEffect, useRef, useState, FunctionComponent } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


interface MyDatePickerProps {
  onDateRangeSelect: (startDate: Date | null, endDate: Date | null) => void;
  // setCurrentDate: boolean; // New prop to indicate if the current date should be set
}

const MyDatePicker: FunctionComponent<MyDatePickerProps> = ({
  onDateRangeSelect,
  // setCurrentDate,
}) => {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      const options: flatpickr.Options.Options = {
        mode: 'range',
        dateFormat: 'Y-m-d',
        // defaultDate: setCurrentDate ? 'today' : undefined, // Set defaultDate to 'today' if setCurrentDate is true
        onChange: (selectedDates: Date[]) => {
          if (selectedDates.length === 2) {
            setStartDate(selectedDates[0]);
            setEndDate(selectedDates[1]);
            onDateRangeSelect(selectedDates[0], selectedDates[1]);
          } else if (selectedDates.length === 1) {
            setStartDate(selectedDates[0]);
            setEndDate(null);
            onDateRangeSelect(selectedDates[0], null);
          }
        },
      };
      flatpickr(datePickerRef.current, options);
    }
  }, [onDateRangeSelect]);

  return (
    <input type="text" ref={datePickerRef} placeholder="Select Date Range" readOnly />
  );
};

export default MyDatePicker;
