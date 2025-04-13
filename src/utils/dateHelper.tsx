import { parse, isValid } from 'date-fns';

export const parseDateSafe = (dateStr: string): number => {
  if (!dateStr) return 0;

  let cleaned = dateStr.replace(/^[A-Za-z]{3},\s*/, '');

  cleaned = cleaned.replace(/\sGMT$/, ' +0000');

  const formatsToTry = [
    'dd MMM yyyy HH:mm:ss xxxx',
    'dd MMM yyyy HH:mm xxxx',
    'dd MMM yyyy HH:mm:ss',
    'dd MMM yyyy HH:mm',
  ];

  for (const format of formatsToTry) {
    const parsed: Date = parse(cleaned, format, new Date());
    if (isValid(parsed)) return parsed.getTime();
  }

  return 0;
};
