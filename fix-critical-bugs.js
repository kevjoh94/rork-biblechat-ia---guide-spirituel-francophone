#!/usr/bin/env node

/**
 * Script de correction automatique des bugs critiques
 * BibleChat IA - Corrections prioritaires
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Démarrage des corrections automatiques...\n');

// 1. Corriger les imports manquants
const fixImports = () => {
  console.log('📦 Correction des imports...');
  
  const files = [
    'app/(tabs)/index.tsx',
    'app/(tabs)/chat.tsx',
    'app/(tabs)/bible.tsx',
    'app/(tabs)/profile.tsx',
    'app/(tabs)/more.tsx'
  ];
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Vérifier si React est importé
      if (!content.includes('import React') && content.includes('React.')) {
        content = 'import React from \'react\';\n' + content;
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ ${file} - React importé`);
      }
      
      // Vérifier les imports de types
      if (content.includes('BiblicalContent') && !content.includes('import.*BiblicalContent')) {
        const importLine = 'import { BiblicalContent } from \'@/types/spiritual\';\n';
        content = content.replace(/^(import.*from.*;\n)/m, '$1' + importLine);
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ ${file} - Types importés`);
      }
    }
  });
};

// 2. Corriger les sélecteurs Zustand
const fixZustandSelectors = () => {
  console.log('🏪 Optimisation des sélecteurs Zustand...');
  
  const optimizedSelector = `
// Sélecteur optimisé pour éviter les re-rendus
const useOptimizedSpiritualData = () => {
  return useSpiritualStore(
    useCallback((state) => ({
      stats: state.stats,
      dailyVerse: state.dailyVerse,
      userProfile: state.userProfile,
      achievements: state.achievements
    }), [])
  );
};`;
  
  // Ajouter le sélecteur optimisé aux fichiers qui en ont besoin
  const files = ['app/(tabs)/index.tsx', 'app/(tabs)/profile.tsx'];
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('useOptimizedSpiritualData')) {
        // Ajouter après les imports
        const importEndIndex = content.lastIndexOf('import');
        const nextLineIndex = content.indexOf('\n', importEndIndex);
        content = content.slice(0, nextLineIndex + 1) + optimizedSelector + '\n' + content.slice(nextLineIndex + 1);
        
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ ${file} - Sélecteur optimisé ajouté`);
      }
    }
  });
};

// 3. Ajouter la gestion d'erreurs
const addErrorHandling = () => {
  console.log('🛡️ Ajout de la gestion d\'erreurs...');
  
  const errorBoundary = `
// Error Boundary pour une meilleure stabilité
const withErrorBoundary = (Component) => {
  return (props) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};`;
  
  // Créer un fichier utilitaire pour la gestion d'erreurs
  const errorUtilsPath = path.join(__dirname, 'utils/error-handling.ts');
  const errorUtilsContent = `
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return (props: P) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  try {
    return await asyncFn();
  } catch (error) {
    console.error('Async error handled:', error);
    return fallback;
  }
};

export const safeAccess = <T>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined => {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
  } catch {
    return defaultValue;
  }
};
`;
  
  fs.writeFileSync(errorUtilsPath, errorUtilsContent);
  console.log('  ✅ Utilitaires de gestion d\'erreurs créés');
};

// 4. Optimiser les performances
const optimizePerformance = () => {
  console.log('⚡ Optimisation des performances...');
  
  const performanceUtils = `
import React, { memo, useMemo, useCallback } from 'react';

// Hook pour optimiser les re-rendus
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

// Hook pour mémoriser les objets complexes
export const useStableObject = <T extends object>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return useMemo(factory, deps);
};

// HOC pour mémoriser les composants
export const withMemo = <P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, areEqual);
};
`;
  
  const perfUtilsPath = path.join(__dirname, 'utils/performance-optimized.ts');
  fs.writeFileSync(perfUtilsPath, performanceUtils);
  console.log('  ✅ Utilitaires de performance créés');
};

// 5. Créer un guide de bonnes pratiques
const createBestPracticesGuide = () => {
  console.log('📚 Création du guide des bonnes pratiques...');
  
  const guide = `# 🎯 Guide des Bonnes Pratiques - BibleChat IA

## 🏗️ Architecture

### Composants
- Utilisez \`React.memo\` pour les composants qui re-rendent souvent
- Séparez la logique métier des composants UI
- Créez des hooks personnalisés pour la logique réutilisable

### État Global (Zustand)
- Utilisez des sélecteurs optimisés avec \`useCallback\`
- Évitez les sélecteurs multiples dans un même composant
- Préférez les sélecteurs combinés

### Performance
- Utilisez \`useMemo\` pour les calculs coûteux
- Utilisez \`useCallback\` pour les fonctions passées en props
- Évitez les objets/fonctions inline dans les props

## 🎨 UI/UX

### Thèmes
- Utilisez toujours \`useTheme()\` pour les couleurs
- Testez en mode sombre et clair
- Respectez les contrastes d'accessibilité

### Navigation
- Utilisez \`router.back()\` pour les retours
- Ajoutez des animations de transition
- Gérez les états de chargement

### Accessibilité
- Ajoutez \`accessibilityLabel\` aux éléments interactifs
- Utilisez \`accessibilityRole\` approprié
- Testez avec un lecteur d'écran

## 🔧 Développement

### TypeScript
- Activez le mode strict
- Typez explicitement les props et états
- Utilisez des interfaces plutôt que des types quand possible

### Tests
- Écrivez des tests unitaires pour la logique métier
- Testez les composants critiques
- Ajoutez des tests d'accessibilité

### Debugging
- Utilisez Flipper pour le debug
- Ajoutez des logs structurés
- Utilisez des Error Boundaries

## 📱 Mobile

### Performance
- Optimisez les images
- Utilisez FlatList pour les listes longues
- Gérez la mémoire correctement

### UX Mobile
- Ajoutez des feedbacks haptiques (iOS)
- Gérez les orientations d'écran
- Optimisez pour les différentes tailles d'écran

## 🚀 Déploiement

### Pré-déploiement
- Vérifiez tous les tests
- Testez sur différents appareils
- Vérifiez les performances

### Monitoring
- Ajoutez des métriques de performance
- Surveillez les erreurs
- Collectez les feedbacks utilisateurs
`;
  
  const guidePath = path.join(__dirname, 'GUIDE_BONNES_PRATIQUES.md');
  fs.writeFileSync(guidePath, guide);
  console.log('  ✅ Guide des bonnes pratiques créé');
};

// Exécution du script
const main = async () => {
  try {
    fixImports();
    fixZustandSelectors();
    addErrorHandling();
    optimizePerformance();
    createBestPracticesGuide();
    
    console.log('\n🎉 Corrections automatiques terminées !');
    console.log('\n📋 Prochaines étapes manuelles :');
    console.log('1. Vérifier les imports ajoutés');
    console.log('2. Tester les sélecteurs optimisés');
    console.log('3. Implémenter les Error Boundaries');
    console.log('4. Ajouter les tests unitaires');
    console.log('5. Optimiser les composants lourds');
    
  } catch (error) {
    console.error('❌ Erreur lors des corrections :', error);
  }
};

main();