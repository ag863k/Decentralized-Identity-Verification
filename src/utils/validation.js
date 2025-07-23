export const isValidIPFSHash = (hash) => {
  if (!hash || typeof hash !== 'string') return false;
  const ipfsRegex = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
  return ipfsRegex.test(hash.trim());
};

export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }
  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  const nameRegex = /^[a-zA-Z0-9\s\-']+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }
  return { isValid: true, error: null };
};

export const isValidEthereumAddress = (address) => {
  if (!address || typeof address !== 'string') return false;
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
};

export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};
