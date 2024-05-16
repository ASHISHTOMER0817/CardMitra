import React, { useEffect, useRef, useState, FunctionComponent } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


interface MyDatePickerProps {
  onDateRangeSelect: (startDate: Date, endDate: Date) => void; // Callback for date range selection
}

const MyDatePicker: FunctionComponent<MyDatePickerProps> = ({ onDateRangeSelect }) => {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (datePickerRef.current) {
      const options: flatpickr.Options.Options = {
        mode: 'range', // Set Flatpickr mode to 'range'
        dateFormat: 'Y-m-d',
      //   defaultDate: 'today', // Default date is today's date
        onChange: (selectedDates: Date[]) => {
          if (selectedDates.length === 2) {
            setStartDate(selectedDates[0]);
            setEndDate(selectedDates[1]);
            // Callback to parent component with selected dates
            onDateRangeSelect(selectedDates[0], selectedDates[1]);
          }
        },
      };

      flatpickr(datePickerRef.current, options);
    }
  }, [onDateRangeSelect]); // Runs once after component is mounted

  return (
    <input
      type="text"
      ref={datePickerRef}
      placeholder="Select Date Range"
      readOnly
    />
  );
};

export default MyDatePicker;
