
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    errorEmitter.on('permission-error', (error: FirestorePermissionError) => {
      // In production, we'd handle this more gracefully.
      // In development/Studio, we let the specialized error handling architecture take over.
      toast({
        variant: 'destructive',
        title: 'Firestore Permission Denied',
        description: `Operation ${error.context.operation} at ${error.context.path} was denied. Check your Security Rules.`,
      });
    });
  }, [toast]);

  return null;
}
