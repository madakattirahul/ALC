import React from 'react';

interface StructuredDataProps {
  schema: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

export default StructuredData;
